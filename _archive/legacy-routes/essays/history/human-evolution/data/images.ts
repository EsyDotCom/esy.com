// Verified licensing-safe images for Human Evolution essay
// All URLs verified to return Content-Type: image/*
// Licenses: CC0, CC BY, CC BY-SA, Public Domain

export interface ImageData {
  id: string;
  title: string;
  src: string;
  alt: string;
  caption?: string;
  license: 'CC0' | 'CC BY' | 'CC BY-SA' | 'CC BY-SA 3.0' | 'CC BY-SA 4.0' | 'CC BY 2.0' | 'CC BY 3.0' | 'Public Domain' | 'CC BY-SA FR';
  attribution: string;
  source: string;
}

export const specimenImages: Record<string, ImageData> = {
  lucy: {
    id: "lucy",
    title: "Lucy skeleton",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Lucy_Mexico.jpg",
    alt: "Lucy (Australopithecus afarensis) skeleton reconstruction at the Museo Nacional de Antropologia, Mexico City",
    caption: "Lucy (AL 288-1), the most famous Australopithecus afarensis specimen, ~3.2 million years old",
    license: "Public Domain",
    attribution: "Released to public domain by en:User:danrha",
    source: "Museo Nacional de Antropologia, Mexico City"
  },
  laetoli: {
    id: "laetoli",
    title: "Laetoli footprints replica",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/61/Laetoli_footprints_replica.jpg",
    alt: "Replica of the Laetoli hominin footprints, 3.66 million years old",
    caption: "Laetoli footprints: direct evidence of bipedal walking 3.66 million years ago",
    license: "CC BY-SA",
    attribution: "Momotarou2012, CC BY-SA 3.0, via Wikimedia Commons",
    source: "National Museum of Nature and Science, Tokyo (replica)"
  },
  turkanaBoy: {
    id: "turkana-boy",
    title: "Turkana Boy skeleton",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Turkana_Boy.jpg",
    alt: "Turkana Boy (Nariokotome Boy) Homo ergaster skeleton, ~1.6 million years old",
    caption: "Turkana Boy (KNM-WT 15000): the most complete early human skeleton, showing modern body proportions",
    license: "CC BY-SA",
    attribution: "Claire Houck, CC BY-SA 2.0, via Wikimedia Commons",
    source: "American Museum of Natural History"
  },
  neanderthalSkull: {
    id: "neanderthal-skull",
    title: "Neanderthal skull (La Chapelle-aux-Saints)",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Homo_sapiens_neanderthalensis.jpg",
    alt: "Homo neanderthalensis skull from La Chapelle-aux-Saints, France",
    caption: "Neanderthal skull (La Chapelle-aux-Saints 1), discovered 1908",
    license: "CC BY",
    attribution: "Luna04, CC BY 2.5, via Wikimedia Commons",
    source: "La Chapelle-aux-Saints, France"
  },
  denisovaCave: {
    id: "denisova-cave",
    title: "Denisova Cave",
    src: "https://upload.wikimedia.org/wikipedia/commons/1/11/Den_peschera_anui.jpg",
    alt: "View from Denisova Cave to the Anui River, Altai Mountains, Russia",
    caption: "Denisova Cave: the only site with fossils from Denisovans, Neanderthals, and modern humans",
    license: "CC BY-SA",
    attribution: "CC BY-SA 3.0, via Wikimedia Commons",
    source: "Altai Krai, Russia"
  },
  floresiensisSkull: {
    id: "floresiensis-skull",
    title: "Homo floresiensis skull",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Homo_floresiensis_IMG_2936.JPG",
    alt: "Homo floresiensis skull replica, the 'Hobbit' of Flores Island",
    caption: "H. floresiensis skull: small-brained human species that survived until ~50,000 years ago",
    license: "CC BY-SA FR",
    attribution: "Rama, CC BY-SA 3.0 FR, via Wikimedia Commons",
    source: "Cantonal Museum of Geology, Lausanne"
  },
  nalediSkull: {
    id: "naledi-skull",
    title: "Homo naledi cranial specimens",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/54/Homo_naledi_cranial_paratypes.jpg",
    alt: "Homo naledi cranial paratypes from Rising Star Cave, South Africa",
    caption: "H. naledi skulls: primitive body with human-like hands, lived 335,000-236,000 years ago",
    license: "CC BY",
    attribution: "Lee Roger Berger et al., CC BY 4.0, via Wikimedia Commons",
    source: "eLife Sciences Publications"
  },
  jebelIrhoud: {
    id: "jebel-irhoud",
    title: "Jebel Irhoud skull reconstruction",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Homo_sapiens_from_Jebel_Irhoud.jpg",
    alt: "Composite reconstruction of the earliest known Homo sapiens from Jebel Irhoud, Morocco",
    caption: "Jebel Irhoud: oldest known Homo sapiens fossils, ~315,000 years old",
    license: "CC BY-SA",
    attribution: "Philipp Gunz, MPI EVA, CC BY-SA 2.0, via Wikimedia Commons",
    source: "Max Planck Institute for Evolutionary Anthropology"
  },
  toumai: {
    id: "toumai",
    title: "Sahelanthropus tchadensis skull",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Sahelanthropus_tchadensis_-_TM_266-01-060-1.jpg",
    alt: "Sahelanthropus tchadensis (Toumaï) skull, approximately 7 million years old",
    caption: "Toumaï: possibly the oldest known hominin, discovered in Chad in 2001",
    license: "CC BY-SA 4.0",
    attribution: "Didier Descouens, CC BY-SA 4.0, via Wikimedia Commons",
    source: "Muséum national d'histoire naturelle, Paris"
  },
  ardi: {
    id: "ardi",
    title: "Ardipithecus ramidus reconstruction",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Ardipithecus_ramidus.jpg",
    alt: "Ardipithecus ramidus (Ardi) skeletal reconstruction, 4.4 million years old",
    caption: "Ardi: 45% complete skeleton showing mix of bipedal and arboreal adaptations",
    license: "CC BY-SA 3.0",
    attribution: "Tobias Fluegel, CC BY-SA 3.0, via Wikimedia Commons",
    source: "Middle Awash, Ethiopia"
  },
  omoKibish: {
    id: "omo-kibish",
    title: "Omo Kibish skull",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/01/Omo_Kibish_-_MCN_4152_%28cropped%29.jpg",
    alt: "Omo I skull from Omo Kibish, Ethiopia, approximately 233,000 years old",
    caption: "Omo I: among the earliest anatomically modern Homo sapiens fossils",
    license: "CC BY-SA 4.0",
    attribution: "CC BY-SA 4.0, via Wikimedia Commons",
    source: "Omo Kibish Formation, Ethiopia"
  },
  herto: {
    id: "herto",
    title: "Herto skull (Homo sapiens idaltu)",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/df/Teschio_di_Homo_sapiens_idaltu%2C_del_pleistocene%2C_200-160_mila_anni_fa.jpg",
    alt: "Homo sapiens idaltu skull from Herto, Ethiopia, 160,000 years old",
    caption: "Herto: early Homo sapiens with archaic features, showing mortuary practices",
    license: "CC BY 3.0",
    attribution: "Sailko, CC BY 3.0, via Wikimedia Commons",
    source: "Middle Awash, Ethiopia"
  }
};

export const toolImages: Record<string, ImageData> = {
  oldowanChopper: {
    id: "oldowan-chopper",
    title: "Olduvai Chopper",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Olduvai_Chopper.JPG",
    alt: "Oldowan stone chopper from Olduvai Gorge, approximately 1.8 million years old",
    caption: "Oldowan chopper: the earliest systematic stone tool tradition, ~2.6 million years ago",
    license: "CC BY",
    attribution: "Archaeomoonwalker, CC BY 3.0, via Wikimedia Commons",
    source: "British Museum, London"
  },
  acheuleanHandaxe: {
    id: "acheulean-handaxe",
    title: "Acheulean handaxe from Atapuerca",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Bifaz_de_Atapuerca_%28TG10%29.jpg",
    alt: "Bifacial Acheulean handaxe in quartzite from Atapuerca, Spain, ~350,000 years old",
    caption: "Acheulean handaxe: remarkably consistent design across continents for over 1 million years",
    license: "Public Domain",
    attribution: "Jose-Manuel Benito Alvarez (Locutus Borg), Public Domain",
    source: "Trinchera Galeria, Atapuerca, Spain"
  },
  levalloisCore: {
    id: "levallois-core",
    title: "Levallois core",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/25/Levallois_N%C3%BAcleo_Tabuniense.png",
    alt: "Levallois lithic core from Mugharet et-Tabun, Israel",
    caption: "Levallois technique: sophisticated prepared-core method appearing ~400,000 years ago",
    license: "Public Domain",
    attribution: "Jose-Manuel Benito (Locutus Borg), Public Domain",
    source: "Mugharet et-Tabun, Israel"
  },
  blombosOchre: {
    id: "blombos-ochre",
    title: "Blombos Cave engraved ochre",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Blombo.jpg",
    alt: "Engraved ochre stone from Blombos Cave, South Africa, ~77,000 years old",
    caption: "Blombos ochre: earliest known abstract art, with crosshatched geometric patterns",
    license: "CC BY-SA",
    attribution: "Chris S. Henshilwood, CC BY-SA 4.0, via Wikimedia Commons",
    source: "Blombos Cave, South Africa"
  },
  blombosBeads: {
    id: "blombos-beads",
    title: "Blombos Cave shell beads",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/46/BBC-shell-beads.jpg",
    alt: "Nassarius shell beads from Blombos Cave, evidence of early symbolic behavior",
    caption: "Shell beads from Blombos Cave: evidence of personal ornamentation ~82,000 years ago",
    license: "CC BY",
    attribution: "Chris Henshilwood & Francesco d'Errico, CC BY 2.5",
    source: "Blombos Cave, South Africa"
  }
};

export const siteImages: Record<string, ImageData> = {
  olduvaiGorge: {
    id: "olduvai-gorge",
    title: "Olduvai Gorge panorama",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Olduvai_Gorge_or_Oldupai_Gorge.jpg",
    alt: "Panoramic view of Olduvai Gorge in Tanzania",
    caption: "Olduvai Gorge: where the Leakeys made groundbreaking hominin discoveries spanning 2 million years",
    license: "CC BY",
    attribution: "Noel Feans, CC BY 2.0, via Wikimedia Commons",
    source: "Olduvai Gorge Museum, Tanzania"
  },
  riftValley: {
    id: "rift-valley",
    title: "East African Rift Valley",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/66/ISS-30_East_African_Rift_Valley_in_Kenya.jpg",
    alt: "East African Rift Valley in Kenya photographed from the International Space Station",
    caption: "The East African Rift Valley: a geological 'scar' that preserved our earliest ancestors",
    license: "Public Domain",
    attribution: "NASA, Public Domain",
    source: "NASA/ISS Expedition 30"
  },
  risingStarCave: {
    id: "rising-star-cave",
    title: "Rising Star Cave expedition",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/39/Rising_star_cave_exploration_%2814054047275%29.jpg",
    alt: "Command center at the entrance of Rising Star Cave, South Africa",
    caption: "Rising Star Cave: where over 1,500 Homo naledi bones were discovered in 2013-2015",
    license: "CC BY",
    attribution: "Simon Fraser University, CC BY 2.0",
    source: "Rising Star Expedition, South Africa"
  },
  blombosCave: {
    id: "blombos-cave",
    title: "Blombos Cave exterior",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Blombos.jpg",
    alt: "General view of Blombos Cave site, South Africa",
    caption: "Blombos Cave: key site for early Homo sapiens symbolic behavior",
    license: "CC BY-SA",
    attribution: "Vincent Mourre / Inrap, CC BY-SA 3.0",
    source: "Blombos Cave, South Africa"
  },
  skhulCave: {
    id: "skhul-cave",
    title: "Skhul Cave",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/58/Skhul_Cave.JPG",
    alt: "Entrance to Skhul Cave on Mount Carmel, Israel",
    caption: "Skhul Cave: site of early Homo sapiens outside Africa, ~120,000 years ago",
    license: "CC BY-SA 3.0",
    attribution: "Hanay, CC BY-SA 3.0, via Wikimedia Commons",
    source: "Mount Carmel, Israel"
  },
  qafzehCave: {
    id: "qafzeh-cave",
    title: "Qafzeh Cave entrance",
    src: "https://upload.wikimedia.org/wikipedia/commons/1/10/Eingang_der_Qafzeh-H%C3%B6hle.jpg",
    alt: "Entrance to Qafzeh Cave near Nazareth, Israel",
    caption: "Qafzeh Cave: early modern humans with intentional burials, ~92,000 years ago",
    license: "CC BY-SA 4.0",
    attribution: "Hanay, CC BY-SA 4.0, via Wikimedia Commons",
    source: "Lower Galilee, Israel"
  },
  niahCave: {
    id: "niah-cave",
    title: "Niah Great Cave",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Niah_Great_Cave%2C_Sarawak%2C_Malaysia.jpg",
    alt: "Niah Great Cave in Sarawak, Malaysia, site of the Deep Skull",
    caption: "Niah Cave: oldest modern human remains in Southeast Asia, ~40,000 years ago",
    license: "CC BY 2.0",
    attribution: "Geoarts, CC BY 2.0, via Wikimedia Commons",
    source: "Sarawak, Malaysia"
  },
  lakeMungo: {
    id: "lake-mungo",
    title: "Lake Mungo lunette",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Lake_Mungo_lunette.jpg",
    alt: "Lake Mungo lunette landscape in New South Wales, Australia",
    caption: "Lake Mungo: oldest human remains in Australia, ~42,000 years ago",
    license: "CC BY-SA 4.0",
    attribution: "Noodle snacks, CC BY-SA 4.0, via Wikimedia Commons",
    source: "Willandra Lakes, Australia"
  }
};

export const methodImages: Record<string, ImageData> = {
  radiometricDating: {
    id: "radiometric-dating",
    title: "Uranium decay chain diagram",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/65/Decay_chain%284n%2B2%2C_Uranium_series%29.svg",
    alt: "Uranium-238 decay chain showing radioactive decay series",
    caption: "Radiometric dating: measuring radioactive decay to determine absolute ages",
    license: "CC BY 3.0",
    attribution: "BatesIsBack, CC BY 3.0, via Wikimedia Commons",
    source: "Wikimedia Commons"
  },
  ancientDNA: {
    id: "ancient-dna",
    title: "Ancient DNA extraction",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Neanderthal_DNA_extraction.jpg",
    alt: "Laboratory setup for ancient DNA extraction from fossil specimens",
    caption: "Ancient DNA: extracting and sequencing genetic material from fossils",
    license: "Public Domain",
    attribution: "Max Planck Institute for Evolutionary Anthropology, Public Domain",
    source: "MPI-EVA Leipzig"
  },
  stratigraphy: {
    id: "stratigraphy",
    title: "Grand Canyon stratigraphy",
    src: "https://upload.wikimedia.org/wikipedia/commons/1/14/Stratigraphy_of_the_Grand_Canyon.png",
    alt: "Stratigraphic layers of the Grand Canyon showing geological time",
    caption: "Stratigraphy: reading Earth's history through rock layers",
    license: "Public Domain",
    attribution: "US National Park Service, Public Domain",
    source: "Grand Canyon National Park"
  },
  comparativeAnatomy: {
    id: "comparative-anatomy",
    title: "Primate skull comparison",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/ae/The_Skulls_of_the_gorilla%2Cchimpanzee_and_humans_-_Kaiwei_Zhang.jpg",
    alt: "Comparison of gorilla, chimpanzee, and human skulls",
    caption: "Comparative anatomy: analyzing structural similarities and differences across species",
    license: "CC BY-SA 3.0",
    attribution: "Kaiwei Zhang, CC BY-SA 3.0, via Wikimedia Commons",
    source: "Comparative skeletal collection"
  },
  dnaStructure: {
    id: "dna-structure",
    title: "DNA double helix",
    src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/DNA_simple.svg",
    alt: "Simplified diagram of DNA double helix structure",
    caption: "DNA: the molecular basis of genetic inheritance and evolutionary evidence",
    license: "Public Domain",
    attribution: "Madprime, Public Domain",
    source: "Wikimedia Commons"
  }
};

// Helper to get image by ID
export const getImageById = (id: string): ImageData | undefined => {
  return specimenImages[id] || toolImages[id] || siteImages[id] || methodImages[id];
};

// All images combined for easy iteration
export const allImages: ImageData[] = [
  ...Object.values(specimenImages),
  ...Object.values(toolImages),
  ...Object.values(siteImages),
  ...Object.values(methodImages)
];
