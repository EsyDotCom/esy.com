export interface Species {
  id: string;
  name: string;
  commonName?: string;
  dateFirst: number;
  dateLast: number;
  dateUnit: 'Ma' | 'ka';
  brainSize?: {
    value: number;
    range?: [number, number];
    unit: 'cc';
  };
  location: string;
  keyFeatures: string[];
  significance: string;
  confidence: 'very high' | 'high' | 'moderate' | 'low';
  group: 'earliest' | 'australopith' | 'paranthropus' | 'early-homo' | 'erectus' | 'archaic' | 'sapiens';
}

export const species: Species[] = [
  {
    id: "sahelanthropus",
    name: "Sahelanthropus tchadensis",
    commonName: "Toumai",
    dateFirst: 7.0,
    dateLast: 6.0,
    dateUnit: "Ma",
    brainSize: { value: 350, unit: "cc" },
    location: "Chad, Central Africa",
    keyFeatures: ["Small brain", "Flat face", "Forward foramen magnum"],
    significance: "Possibly oldest known hominin",
    confidence: "moderate",
    group: "earliest"
  },
  {
    id: "orrorin",
    name: "Orrorin tugenensis",
    dateFirst: 6.1,
    dateLast: 5.7,
    dateUnit: "Ma",
    location: "Tugen Hills, Kenya",
    keyFeatures: ["Femoral morphology suggesting bipedalism"],
    significance: "Evidence of bipedalism by 6 Ma",
    confidence: "moderate",
    group: "earliest"
  },
  {
    id: "ardipithecus-ramidus",
    name: "Ardipithecus ramidus",
    commonName: "Ardi",
    dateFirst: 4.5,
    dateLast: 4.3,
    dateUnit: "Ma",
    brainSize: { value: 325, range: [300, 350], unit: "cc" },
    location: "Middle Awash, Ethiopia",
    keyFeatures: ["45% complete skeleton", "Divergent big toe", "Bipedal pelvis"],
    significance: "Demonstrates bipedalism in woodland environment",
    confidence: "high",
    group: "earliest"
  },
  {
    id: "australopithecus-anamensis",
    name: "Australopithecus anamensis",
    dateFirst: 4.2,
    dateLast: 3.9,
    dateUnit: "Ma",
    location: "Kenya",
    keyFeatures: ["Bipedal", "Primitive dentition"],
    significance: "Oldest definitive australopithecine",
    confidence: "high",
    group: "australopith"
  },
  {
    id: "australopithecus-afarensis",
    name: "Australopithecus afarensis",
    commonName: "Lucy's species",
    dateFirst: 3.9,
    dateLast: 2.9,
    dateUnit: "Ma",
    brainSize: { value: 430, range: [380, 500], unit: "cc" },
    location: "Ethiopia, Tanzania",
    keyFeatures: ["Small brain", "Obligate biped", "Sexually dimorphic"],
    significance: "Best-known early hominin; Laetoli footprints",
    confidence: "high",
    group: "australopith"
  },
  {
    id: "australopithecus-africanus",
    name: "Australopithecus africanus",
    dateFirst: 3.3,
    dateLast: 2.1,
    dateUnit: "Ma",
    brainSize: { value: 450, range: [400, 500], unit: "cc" },
    location: "South Africa",
    keyFeatures: ["Gracile build", "Rounded cranium"],
    significance: "First australopithecine discovered (1924)",
    confidence: "high",
    group: "australopith"
  },
  {
    id: "paranthropus-aethiopicus",
    name: "Paranthropus aethiopicus",
    dateFirst: 2.7,
    dateLast: 2.3,
    dateUnit: "Ma",
    brainSize: { value: 410, unit: "cc" },
    location: "Kenya, Ethiopia",
    keyFeatures: ["Large sagittal crest", "Massive jaws"],
    significance: "Earliest robust australopithecine",
    confidence: "moderate",
    group: "paranthropus"
  },
  {
    id: "paranthropus-boisei",
    name: "Paranthropus boisei",
    commonName: "Nutcracker Man",
    dateFirst: 2.3,
    dateLast: 1.2,
    dateUnit: "Ma",
    brainSize: { value: 500, range: [475, 545], unit: "cc" },
    location: "East Africa",
    keyFeatures: ["Massive molars", "Pronounced sagittal crest"],
    significance: "Specialized hard-food diet",
    confidence: "high",
    group: "paranthropus"
  },
  {
    id: "homo-habilis",
    name: "Homo habilis",
    commonName: "Handy Man",
    dateFirst: 2.3,
    dateLast: 1.4,
    dateUnit: "Ma",
    brainSize: { value: 550, range: [510, 600], unit: "cc" },
    location: "East Africa",
    keyFeatures: ["Larger brain than australopiths", "Smaller teeth"],
    significance: "First Homo; associated with Oldowan tools",
    confidence: "moderate",
    group: "early-homo"
  },
  {
    id: "homo-ergaster",
    name: "Homo ergaster",
    dateFirst: 1.9,
    dateLast: 1.5,
    dateUnit: "Ma",
    brainSize: { value: 850, range: [800, 900], unit: "cc" },
    location: "East Africa",
    keyFeatures: ["Tall stature", "Modern body proportions"],
    significance: "First hominin with modern-like body plan",
    confidence: "high",
    group: "erectus"
  },
  {
    id: "homo-erectus",
    name: "Homo erectus",
    dateFirst: 1.9,
    dateLast: 0.117,
    dateUnit: "Ma",
    brainSize: { value: 1000, range: [600, 1250], unit: "cc" },
    location: "Africa, Asia",
    keyFeatures: ["Thick cranial vault", "Long-surviving lineage"],
    significance: "First to leave Africa at scale; 1.8+ million years survival",
    confidence: "high",
    group: "erectus"
  },
  {
    id: "homo-heidelbergensis",
    name: "Homo heidelbergensis",
    dateFirst: 0.7,
    dateLast: 0.2,
    dateUnit: "Ma",
    brainSize: { value: 1250, range: [1100, 1400], unit: "cc" },
    location: "Europe, Africa",
    keyFeatures: ["Large brain", "Robust build"],
    significance: "Possible ancestor of Neanderthals and H. sapiens",
    confidence: "moderate",
    group: "archaic"
  },
  {
    id: "homo-neanderthalensis",
    name: "Homo neanderthalensis",
    commonName: "Neanderthals",
    dateFirst: 400,
    dateLast: 40,
    dateUnit: "ka",
    brainSize: { value: 1450, range: [1200, 1700], unit: "cc" },
    location: "Europe, Western Asia",
    keyFeatures: ["Large brain", "Robust skeleton", "Cold adaptations"],
    significance: "Closest relative; 1-2% DNA in non-Africans",
    confidence: "very high",
    group: "archaic"
  },
  {
    id: "denisovans",
    name: "Denisovans",
    dateFirst: 300,
    dateLast: 30,
    dateUnit: "ka",
    location: "Altai Mountains, possibly wider Asia",
    keyFeatures: ["Known primarily from DNA", "Limited morphology"],
    significance: "Sister group to Neanderthals; 1.9-6% DNA in Melanesians",
    confidence: "high",
    group: "archaic"
  },
  {
    id: "homo-naledi",
    name: "Homo naledi",
    dateFirst: 335,
    dateLast: 236,
    dateUnit: "ka",
    brainSize: { value: 500, range: [465, 560], unit: "cc" },
    location: "South Africa",
    keyFeatures: ["Small brain", "Human-like hands/feet", "Primitive torso"],
    significance: "Primitive body contemporary with early H. sapiens",
    confidence: "high",
    group: "archaic"
  },
  {
    id: "homo-floresiensis",
    name: "Homo floresiensis",
    commonName: "Hobbit",
    dateFirst: 190,
    dateLast: 50,
    dateUnit: "ka",
    brainSize: { value: 400, range: [380, 420], unit: "cc" },
    location: "Flores, Indonesia",
    keyFeatures: ["Very small body (~1.06 m)", "Small brain"],
    significance: "Island evolution; survived alongside H. sapiens",
    confidence: "high",
    group: "archaic"
  },
  {
    id: "homo-sapiens",
    name: "Homo sapiens",
    commonName: "Modern Humans",
    dateFirst: 315,
    dateLast: 0,
    dateUnit: "ka",
    brainSize: { value: 1350, range: [1100, 1700], unit: "cc" },
    location: "Global (originated in Africa)",
    keyFeatures: ["High rounded cranium", "Small face", "Chin"],
    significance: "Only surviving hominin species",
    confidence: "very high",
    group: "sapiens"
  }
];

export const getSpeciesByGroup = (group: Species['group']): Species[] => {
  return species.filter(s => s.group === group);
};

export const getSpeciesById = (id: string): Species | undefined => {
  return species.find(s => s.id === id);
};

// Convert all dates to ka for comparison
export const normalizeToKa = (date: number, unit: 'Ma' | 'ka'): number => {
  return unit === 'Ma' ? date * 1000 : date;
};

// Get species that existed at a given time (in ka)
export const getSpeciesAtTime = (timeKa: number): Species[] => {
  return species.filter(s => {
    const first = normalizeToKa(s.dateFirst, s.dateUnit);
    const last = normalizeToKa(s.dateLast, s.dateUnit);
    return timeKa <= first && timeKa >= last;
  });
};
