/**
 * Manhattan Project Visual Essay - Image Assets
 * 
 * All images are U.S. Government works (Public Domain) or verified public domain
 * from authoritative institutional archives (NARA, LANL, DOE, Library of Congress)
 * 
 * Source documentation: ./IMAGE_SOURCES.md
 */

export interface ArchivalImage {
  src: string;
  alt: string;
  caption: string;
  source: string;
  date?: string;
  photographer?: string;
}

// Hero Section Images
export const heroImages = {
  trinityTower: {
    src: "https://images.esy.com/essays/the-manhattan-project/trinity-tower.ad89eaa458.jpg",
    alt: "The Trinity test tower with 'The Gadget' suspended at 100 feet",
    caption: "The 100-foot tower at Trinity Site with the Gadget suspended, July 15, 1945",
    source: "Los Alamos National Laboratory",
    date: "July 15, 1945"
  },
  trinityFireball: {
    src: "https://images.esy.com/essays/the-manhattan-project/trinity-test-fireball-16ms.83ddf63450.webp",
    alt: "Trinity test fireball 0.016 seconds after detonation",
    caption: "The Trinity fireball 16 milliseconds after detonation — the surface temperature exceeded that of the sun",
    source: "Los Alamos National Laboratory / Berlyn Brixner",
    date: "July 16, 1945",
    photographer: "Berlyn Brixner"
  },
  trinityMushroom: {
    src: "https://images.esy.com/essays/the-manhattan-project/trinity-test-mushroom-cloud-12s.7a63a9c572.webp",
    alt: "Trinity test mushroom cloud rising into the sky",
    caption: "The mushroom cloud rose 8 miles into the New Mexico sky — 12 seconds after detonation",
    source: "National Nuclear Security Administration",
    date: "July 16, 1945"
  },
  oppenheimer: {
    src: "https://images.esy.com/essays/the-manhattan-project/440px-oppenheimer-28cropped-29.079bcea14c.webp",
    alt: "J. Robert Oppenheimer, scientific director of the Manhattan Project",
    caption: "J. Robert Oppenheimer — 'Now I am become Death, the destroyer of worlds.'",
    source: "Los Alamos National Laboratory",
    date: "1944"
  }
};

// Prologue Images
export const prologueImages = {
  einstein: {
    src: "https://images.esy.com/essays/the-manhattan-project/440px-albert-einstein-head.317dc91463.webp",
    alt: "Albert Einstein, the famous refugee physicist",
    caption: "Einstein at his Princeton study. The pacifist who would set history on an irreversible course.",
    source: "Library of Congress",
    date: "1947"
  },
  einsteinLetter: {
    src: "https://images.esy.com/essays/the-manhattan-project/440px-einstein-roosevelt-letter.1fdb304ba9.webp",
    alt: "The Einstein-Szilard letter to President Roosevelt",
    caption: "The letter that launched the atomic age — Einstein's signature would haunt him for the rest of his life",
    source: "Franklin D. Roosevelt Presidential Library",
    date: "August 2, 1939"
  }
};

// Chapter 1 Images - Chain Reaction
export const chapter1Images = {
  chicagoPile: {
    src: "/images/manhattan-project/chicago-pile-1.jpg",
    alt: "Chicago Pile-1, the first nuclear reactor, beneath Stagg Field",
    caption: "The graphite pile beneath the University of Chicago's squash court achieved the first self-sustaining nuclear chain reaction",
    source: "Argonne National Laboratory / Wikimedia Commons",
    date: "December 2, 1942",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Stagg_Field_reactor.jpg"
  },
  fermi: {
    src: "/images/manhattan-project/enrico-fermi.jpg",
    alt: "Enrico Fermi, architect of the first nuclear reactor",
    caption: "Fermi's preternatural calmness was legendary — he calculated survival odds during the Trinity test",
    source: "National Archives / Wikimedia Commons",
    date: "1943-1949",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Enrico_Fermi_1943-49.jpg"
  },
  cp1Team: {
    src: "/images/manhattan-project/cp1-team.jpg",
    alt: "The Chicago Pile-1 team at the University of Chicago, 1946",
    caption: "'The Italian navigator has just landed in the new world.' — The team that achieved the first chain reaction",
    source: "University of Chicago / Wikimedia Commons",
    date: "1946",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Members_of_the_Chicago_Pile-1_team_at_the_University_of_Chicago,_1946.jpg"
  }
};

// Chapter 2 Images - Secret City
export const chapter2Images = {
  losAlamosGate: {
    src: "/images/manhattan-project/los-alamos-project-main-gate.jpg",
    alt: "Los Alamos Project Main Gate - Passes Must Be Presented to Guards",
    caption: "The only entrance to Site Y. All mail was censored, all lives classified.",
    source: "Oscar-Zero / Ronald Reagan Minuteman Missile State Historic Site",
    date: "1943-1945",
    sourceUrl: "https://oscarzero.wordpress.com/page/12/?pages-list"
  },
  losAlamosPostOffice: {
    src: "/images/manhattan-project/po-box-1663.jpg",
    alt: "Censored envelope addressed to PO Box 1663, Santa Fe, New Mexico",
    caption: "Every letter to Los Alamos went through PO Box 1663, Santa Fe. This cover shows Army censorship stamps — 'OPENED BY' and 'PASSED' — the price of secrecy.",
    source: "Smithsonian National Postal Museum",
    date: "May 1, 1944",
    sourceUrl: "https://postalmuseum.si.edu/object/npm_2007.2029.1"
  },
  losAlamosFamilies: {
    src: "/images/manhattan-project/hutments.jpeg",
    alt: "Temporary housing 'Hutments' at Oak Ridge during the Manhattan Project",
    caption: "Thousands lived in hastily built hutments — pre-fab housing thrown up to accommodate the explosive growth of the Secret Cities.",
    source: "Department of Energy / National Trust for Historic Preservation",
    date: "1943-1945",
    sourceUrl: "https://savingplaces.org/stories/building-the-secret-cities-pre-fab-architecture-of-the-manhattan-project"
  },
  oppenheimerHat: {
    src: "https://images.esy.com/essays/the-manhattan-project/440px-jroppenheimer-losalamos.4e99c6f03e.webp",
    alt: "J. Robert Oppenheimer in his trademark porkpie hat",
    caption: "Eyes that saw too much — Oppenheimer at Los Alamos",
    source: "Los Alamos National Laboratory",
    date: "1944"
  },
  groves: {
    src: "https://images.esy.com/essays/the-manhattan-project/leslie-groves.cf497c1c13.webp",
    alt: "General Leslie Groves in uniform",
    caption: "The man who built the impossible — Groves managed 125,000 workers and billions of dollars in total secrecy",
    source: "U.S. Army / Wikimedia Commons",
    date: "1944",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Leslie_Groves.jpg"
  },
  grovesOppenheimer: {
    src: "https://images.esy.com/essays/the-manhattan-project/trinity-site-2.59705dd8ec.webp",
    alt: "Oppenheimer and Groves at Trinity Test Site",
    caption: "In September 1945, Oppenheimer and Groves examine the remains of the steel test tower at ground zero",
    source: "Atomic Archive / U.S. Army",
    date: "September 1945",
    sourceUrl: "https://www.atomicarchive.com/media/photographs/trinity/trinity-site-2.html"
  }
};

// Chapter 3 Images - The Minds
export const scientistImages = {
  bohr: {
    src: "https://images.esy.com/essays/the-manhattan-project/440px-niels-bohr.ab2fcaba5f.webp",
    alt: "Niels Bohr in contemplation, pipe in hand",
    caption: "The father figure — Bohr escaped Nazi-occupied Denmark and arrived under the codename 'Nicholas Baker'",
    source: "Nobel Foundation",
    date: "1922"
  },
  feynman: {
    src: "https://images.esy.com/essays/the-manhattan-project/richard-feynman-nobel.ea5f6d97e6.webp",
    alt: "Richard Feynman, the irreverent genius",
    caption: "The youngest group leader at Los Alamos, age 24. His wife died while he worked on the bomb.",
    source: "Nobel Foundation",
    date: "1965"
  },
  feynmanLosAlamos: {
    src: "https://images.esy.com/essays/the-manhattan-project/richard-feynman-los-alamos-id-badge.962866c2c5.webp",
    alt: "Richard Feynman at Los Alamos with colleagues",
    caption: "Feynman (center) at Los Alamos — cracked safes for fun, played bongos, drove security crazy",
    source: "Los Alamos National Laboratory",
    date: "1944"
  },
  szilard: {
    src: "https://images.esy.com/essays/the-manhattan-project/440px-leo-szilard.68fb10f8a0.webp",
    alt: "Leo Szilard, the conscience of the project",
    caption: "Conceived the chain reaction in 1933, drafted the Einstein letter, then petitioned against using the bomb on civilians",
    source: "Department of Energy / Wikimedia Commons",
    date: "1940s",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Leo_Szilard.jpg"
  },
  teller: {
    src: "https://images.esy.com/essays/the-manhattan-project/440px-edwardteller1958.53d15588d0.webp",
    alt: "Edward Teller, the hawk",
    caption: "Even during the Manhattan Project, Teller was obsessed with building something bigger — the hydrogen bomb",
    source: "Los Alamos National Laboratory / Wikimedia Commons",
    date: "1958",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:EdwardTeller1958.jpg"
  },
  bethe: {
    src: "https://images.esy.com/essays/the-manhattan-project/440px-hans-bethe.2367eb272c.webp",
    alt: "Hans Bethe at the blackboard",
    caption: "The calculator — Bethe led the Theoretical Division and figured out how stars produce energy",
    source: "Cornell University",
    date: "1940s"
  },
  fuchs: {
    src: "https://images.esy.com/essays/the-manhattan-project/klaus-fuchs-id-badge.14c5121098.webp",
    alt: "Klaus Fuchs Los Alamos ID badge photo",
    caption: "The spy — Fuchs passed atomic secrets to the Soviets while working at the heart of Los Alamos",
    source: "Los Alamos National Laboratory / Wikimedia Commons",
    date: "1944",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Klaus_Fuchs_ID_badge.png"
  }
};

// Chapter 4 Images - The Gadget
export const gadgetImages = {
  assembly: {
    src: "https://images.esy.com/essays/the-manhattan-project/r-oppenheimer-oversees-final-assembly-of-the-gadget-2810537627864-29.4eeae151e4.webp",
    alt: "Oppenheimer oversees final assembly of the Gadget",
    caption: "Oppenheimer watches as scientists make final adjustments — the device that would divide human history",
    source: "Los Alamos National Laboratory / Wikimedia Commons",
    date: "July 1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:R._Oppenheimer_oversees_final_assembly_of_the_gadget_(10537627864).jpg"
  },
  gadgetHoisted: {
    src: "https://images.esy.com/essays/the-manhattan-project/the-gadget-in-the-trinity-test-site-tower-281945-29.3710d18a54.webp",
    alt: "The Gadget installed in the Trinity test tower",
    caption: "The Gadget in the Trinity tower — less than 24 hours before detonation",
    source: "Los Alamos National Laboratory / Wikimedia Commons",
    date: "July 15, 1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_gadget_in_the_Trinity_Test_Site_tower_(1945).jpg"
  },
  implosionLenses: {
    src: "https://images.esy.com/essays/the-manhattan-project/explosive-lenses-of-fat-man.4605b79017.webp",
    alt: "Explosive lens assembly for Fat Man",
    caption: "32 explosive lenses arranged in perfect symmetry — if even one was off, the bomb would fizzle",
    source: "Los Alamos National Laboratory / Wikimedia Commons",
    date: "1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Explosive_lenses_of_Fat_Man.jpg"
  },
  plutoniumCore: {
    src: "https://images.esy.com/essays/the-manhattan-project/partially-reflected-plutonium-sphere.4983d0eb1b.webp",
    alt: "A plutonium sphere similar to the bomb's core",
    caption: "The heart of the bomb — 6.2 kg of plutonium-239, warm to the touch from radioactive decay",
    source: "Los Alamos National Laboratory / Wikimedia Commons",
    date: "1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Partially-reflected-plutonium-sphere.jpeg"
  }
};

// Chapter 5 Images - Trinity
export const trinityImages = {
  towerNight: {
    src: "/images/manhattan-project/trinity-tower.jpg",
    alt: "The 100-foot Trinity test tower standing in the New Mexico desert",
    caption: "The 100-foot tower at Trinity Site — the last moments before the atomic age began",
    source: "Los Alamos National Laboratory / Wikimedia Commons",
    date: "July 1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Trinity_tower.jpg"
  },
  towerWithGadget: {
    src: "/images/manhattan-project/trinity-hoisting-gadget.jpg",
    alt: "The Gadget being hoisted to the top of the Trinity tower, suspended at 100 feet",
    caption: "5:29 AM — The Gadget suspended atop the 100-foot tower, the final countdown begins",
    source: "Los Alamos National Laboratory / Wikimedia Commons",
    date: "July 15, 1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Trinity_Hoisting_Gadget_TR-384.jpg"
  },
  fireball006: {
    src: "https://images.esy.com/essays/the-manhattan-project/trinity-test-the-early-fireball-at-6-milliseconds-2810537699766-29.24c8375f93.webp",
    alt: "Trinity fireball at 0.006 seconds",
    caption: "0.006 seconds — the impossible brightness of a new sun",
    source: "Los Alamos National Laboratory / Berlyn Brixner",
    date: "July 16, 1945",
    photographer: "Berlyn Brixner",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Trinity_Test_-_the_early_fireball_at_6_milliseconds_(10537699766).jpg"
  },
  fireball016: {
    src: "https://images.esy.com/essays/the-manhattan-project/trinity-test-fireball-16ms.83ddf63450.webp",
    alt: "Trinity fireball at 0.016 seconds",
    caption: "0.016 seconds — surface temperature hotter than the sun",
    source: "Los Alamos National Laboratory / Berlyn Brixner",
    date: "July 16, 1945",
    photographer: "Berlyn Brixner",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Trinity_Test_Fireball_16ms.jpg"
  },
  fireball025: {
    src: "https://images.esy.com/essays/the-manhattan-project/trinity-test-fireball-25ms.4cd199c656.webp",
    alt: "Trinity fireball at 0.025 seconds",
    caption: "0.025 seconds — the expanding sphere of nuclear fire",
    source: "Los Alamos National Laboratory / Berlyn Brixner",
    date: "July 16, 1945",
    photographer: "Berlyn Brixner",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Trinity_Test_Fireball-25ms.jpg"
  },
  mushroomCloud: {
    src: "https://images.esy.com/essays/the-manhattan-project/800px-trinity-detonation-t-26b.f633f189de.webp",
    alt: "Trinity mushroom cloud at full development",
    caption: "Eight miles high — visible from 100 miles away",
    source: "U.S. Army / Wikimedia Commons",
    date: "July 16, 1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Trinity_Detonation_T%26B.jpg"
  },
  groundZero: {
    src: "https://images.esy.com/essays/the-manhattan-project/groves-oppenheimer.5c00703c9d.webp",
    alt: "Groves and Oppenheimer at Trinity ground zero",
    caption: "Oppenheimer and Groves examine the remains of the tower base — the sand had fused into green glass",
    source: "U.S. Army / Wikimedia Commons",
    date: "September 1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Groves_Oppenheimer.jpg"
  },
  trinitite: {
    src: "https://images.esy.com/essays/the-manhattan-project/trinitite.ab426abad5.webp",
    alt: "Trinitite — desert sand fused into glass by the nuclear explosion",
    caption: "The crater floor, fused sand turned to green glass (trinitite) — the radioactive footprint of the atomic age",
    source: "Wikimedia Commons",
    date: "1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Trinitite.jpg"
  }
};

// Chapter 6 Images - The Decision
export const decisionImages = {
  trumanPotsdam: {
    src: "https://images.esy.com/essays/the-manhattan-project/potsdam-conference-28joseph-stalin-2c-harry-s-truman-29.2c9f712752.webp",
    alt: "President Truman with Stalin at the Potsdam Conference",
    caption: "Truman at Potsdam — 82 days into his presidency, he learned of the bomb's existence",
    source: "U.S. Army Signal Corps / Wikimedia Commons",
    date: "July 1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Potsdam_Conference_(Joseph_Stalin,_Harry_S._Truman).jpg"
  },
  truman: {
    src: "https://images.esy.com/essays/the-manhattan-project/harry-s-truman-2c-bw-half-length-photo-portrait-2c-facing-front-2c-1945.c843119530.webp",
    alt: "President Harry S. Truman, 1945",
    caption: "'The most terrible thing ever discovered' — Truman authorized its use without apparent hesitation",
    source: "U.S. Government / Wikimedia Commons",
    date: "1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Harry_S_Truman,_bw_half-length_photo_portrait,_facing_front,_1945.jpg"
  }
};

// Chapter 7 Images - Hiroshima
export const hiroshimaImages = {
  enolaGay: {
    src: "https://images.esy.com/essays/the-manhattan-project/b-29-enola-gay-w-crews.e651864acb.webp",
    alt: "The Enola Gay B-29 with ground crew",
    caption: "Named after pilot Paul Tibbets' mother — 12 hours to target",
    source: "U.S. Army Air Forces / Wikimedia Commons",
    date: "August 1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:B-29_Enola_Gay_w_Crews.jpg"
  },
  tibbets: {
    src: "https://images.esy.com/essays/the-manhattan-project/col-paul-w-tibbets-2c-pilot-of-b-29-superfortress-27enola-gay-27.1be8137798.webp",
    alt: "Colonel Paul Tibbets, pilot of the Enola Gay",
    caption: "Tibbets, pilot of the Enola Gay — August 6, 1945",
    source: "U.S. Army Air Forces / Wikimedia Commons",
    date: "August 6, 1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Col_Paul_W._Tibbets,_Pilot_Of_B-29_Superfortress_%27Enola_Gay%27.jpg"
  },
  hiroshimaBefore: {
    src: "https://images.esy.com/essays/the-manhattan-project/downtown-hiroshima-2c-before-the-a-bomb.1905a84057.webp",
    alt: "Downtown Hiroshima before the atomic bomb",
    caption: "Hiroshima — a city of 350,000, before 8:15 AM",
    source: "U.S. Army Air Forces / Wikimedia Commons",
    date: "1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Downtown_Hiroshima,_before_the_A-bomb.jpg"
  },
  hiroshimaAfter: {
    src: "https://images.esy.com/essays/the-manhattan-project/hiroshima-aftermath.55f9b97fee.webp",
    alt: "Hiroshima after the atomic bomb — complete devastation",
    caption: "The city disappeared in 43 seconds",
    source: "U.S. Army Air Forces / Wikimedia Commons",
    date: "August 1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hiroshima_aftermath.jpg"
  },
  hiroshimaCloud: {
    src: "https://images.esy.com/essays/the-manhattan-project/atomic-cloud-over-hiroshima.33dd602bc9.webp",
    alt: "Mushroom cloud over Hiroshima",
    caption: "8:15 AM local time — 80,000 killed instantly",
    source: "U.S. Army Air Forces / Wikimedia Commons",
    date: "August 6, 1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Atomic_cloud_over_Hiroshima.jpg"
  },
  humanShadow: {
    src: "https://images.esy.com/essays/the-manhattan-project/human-shadow-on-stone-by-atomic-bombing-on-hiroshima-sumitomo-bank-2c-hiroshima-branch-around-december-1946.43ec06f37e.webp",
    alt: "Human shadow burned into the Sumitomo Bank steps",
    caption: "A human, vaporized. Their shadow remains, burned into stone. This image contains everything.",
    source: "Hiroshima Peace Memorial Museum / Wikimedia Commons",
    date: "December 1946",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Human_shadow_on_stone_by_atomic_bombing_on_Hiroshima_-_Sumitomo_Bank,_Hiroshima_branch_-_around_December_1946.png"
  }
};

// Chapter 8 Images - Nagasaki
export const nagasakiImages = {
  fatMan: {
    src: "https://images.esy.com/essays/the-manhattan-project/22fat-man-22-atomic-bomb-2827992893451-29.2681fc46dc.webp",
    alt: "Fat Man atomic bomb",
    caption: "Fat Man — the plutonium implosion bomb, more powerful than Little Boy",
    source: "U.S. Navy / Wikimedia Commons",
    date: "August 1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:%22Fat_Man%22_Atomic_Bomb_(27992893451).jpg"
  },
  nagasakiCloud: {
    src: "https://images.esy.com/essays/the-manhattan-project/440px-nagasakibomb.9e34af274c.webp",
    alt: "The Nagasaki mushroom cloud — the iconic color photograph",
    caption: "The only color photograph of a nuclear weapon used in war — August 9, 1945",
    source: "Charles Levy / U.S. Army",
    date: "August 9, 1945",
    photographer: "Charles Levy",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Nagasakibomb.jpg"
  },
  urakamiCathedral: {
    src: "https://images.esy.com/essays/the-manhattan-project/in-the-background-2c-a-roman-catholic-cathedral-on-a-hill-in-nagasaki-2c-ca-1945-nara-519385.1b0fb18978.webp",
    alt: "The Urakami Cathedral in ruins on a hill in Nagasaki",
    caption: "The largest Christian church in Asia, destroyed. Its congregation had gathered for confession.",
    source: "National Archives (NARA) / Wikimedia Commons",
    date: "1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:In_the_background,_a_Roman_Catholic_cathedral_on_a_hill_in_Nagasaki,_ca._1945_-_NARA_-_519385.jpg"
  }
};

// Chapter 9 Images - The Reckoning
export const reckoningImages = {
  oppenheimerMedal: {
    src: "https://images.esy.com/essays/the-manhattan-project/trinity-test-oppenheimer-and-groves-at-ground-zero-001.6201ccc784.webp",
    alt: "Oppenheimer and Groves at Trinity Ground Zero",
    caption: "The hero of Los Alamos — honored by the nation he would soon be accused of betraying",
    source: "U.S. Army / Wikimedia Commons",
    date: "September 1945",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Trinity_Test_-_Oppenheimer_and_Groves_at_Ground_Zero_001.jpg"
  },
  oppenheimerHearing: {
    src: "https://images.esy.com/essays/the-manhattan-project/j-robert-oppenheimer-testifies-to-congress.cc83c5f393.webp",
    alt: "Oppenheimer testifying before Congress",
    caption: "The architect of American nuclear supremacy, on trial for disloyalty",
    source: "U.S. Government / Wikimedia Commons",
    date: "1954",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:J._Robert_Oppenheimer_Testifies_to_Congress.jpg"
  },
  oppenheimerLate: {
    src: "https://images.esy.com/essays/the-manhattan-project/j-robert-oppenheimer-visit-to-israel-28997009326988305171-29-28cropped-29.32eb2647e0.webp",
    alt: "Oppenheimer in his later years during visit to Israel",
    caption: "The destroyer of worlds, destroyed. He died in 1967, never fully rehabilitated.",
    source: "Government Press Office (Israel) / Wikimedia Commons",
    date: "1958",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:J._Robert_Oppenheimer_visit_to_Israel_(997009326988305171)_(cropped).jpg"
  }
};

// Epilogue Images
export const epilogueImages = {
  genbakuDome: {
    src: "https://images.esy.com/essays/the-manhattan-project/a-bomb-dome.5bf1337e8d.webp",
    alt: "Hiroshima Peace Memorial (Genbaku Dome)",
    caption: "The only structure left standing near the hypocenter — preserved as a monument to peace",
    source: "Wikimedia Commons",
    date: "Present day",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:A-Bomb_Dome.jpg"
  },
  peacePark: {
    src: "https://images.esy.com/essays/the-manhattan-project/20181111-hiroshima-memorial-cenotaph-2.ccfa311cde.webp",
    alt: "Hiroshima Peace Memorial Cenotaph",
    caption: "The eternal flame will burn until all nuclear weapons are abolished",
    source: "Wikimedia Commons",
    date: "2018",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:20181111_Hiroshima_Memorial_Cenotaph-2.jpg"
  }
};

// Export all images as a single object for convenience
export const allImages = {
  hero: heroImages,
  prologue: prologueImages,
  chapter1: chapter1Images,
  chapter2: chapter2Images,
  scientists: scientistImages,
  gadget: gadgetImages,
  trinity: trinityImages,
  decision: decisionImages,
  hiroshima: hiroshimaImages,
  nagasaki: nagasakiImages,
  reckoning: reckoningImages,
  epilogue: epilogueImages
};

