export interface GlossaryTerm {
  term: string;
  definition: string;
  pronunciation?: string;
  category: 'anatomy' | 'species' | 'method' | 'era' | 'concept' | 'site' | 'tool';
  relatedTerms?: string[];
}

export const glossary: GlossaryTerm[] = [
  // Anatomy
  {
    term: "Foramen magnum",
    definition: "The large opening at the base of the skull through which the spinal cord passes. Its position indicates whether a species walked upright (positioned underneath) or on all fours (positioned toward the back).",
    pronunciation: "foh-RAY-men MAG-num",
    category: "anatomy",
    relatedTerms: ["bipedalism", "cranium"]
  },
  {
    term: "Bipedalism",
    definition: "Walking on two legs as the primary mode of locomotion. A defining characteristic of hominins, appearing by at least 4.4 million years ago.",
    pronunciation: "by-PED-uh-liz-um",
    category: "anatomy",
    relatedTerms: ["foramen magnum", "pelvis"]
  },
  {
    term: "Sagittal crest",
    definition: "A ridge of bone running along the top of the skull, providing attachment for powerful jaw muscles. Prominent in robust australopithecines (Paranthropus).",
    pronunciation: "SAJ-ih-tul",
    category: "anatomy"
  },
  {
    term: "Encephalization",
    definition: "The evolutionary increase in brain size relative to body size. Human ancestors show a trend toward encephalization over the past 2 million years.",
    category: "anatomy",
    relatedTerms: ["cranial capacity"]
  },
  {
    term: "Cranial capacity",
    definition: "The volume of the brain case, typically measured in cubic centimeters (cc). Modern humans average about 1,350 cc; early Homo was around 600 cc.",
    category: "anatomy"
  },

  // Species
  {
    term: "Hominin",
    definition: "Any member of the human lineage after the split from chimpanzees, approximately 6-7 million years ago. Includes all extinct human relatives and modern humans.",
    pronunciation: "HOM-ih-nin",
    category: "species",
    relatedTerms: ["hominid", "Homo"]
  },
  {
    term: "Hominid",
    definition: "The broader family including all great apes (humans, chimpanzees, gorillas, orangutans) and their extinct ancestors.",
    pronunciation: "HOM-ih-nid",
    category: "species",
    relatedTerms: ["hominin"]
  },
  {
    term: "Australopithecus",
    definition: "A genus of extinct hominins that lived in Africa from about 4.2 to 2 million years ago. Includes the famous 'Lucy' specimen (A. afarensis).",
    pronunciation: "aw-stray-loh-PITH-uh-kus",
    category: "species",
    relatedTerms: ["Lucy", "Paranthropus"]
  },
  {
    term: "Paranthropus",
    definition: "A genus of robust australopithecines with massive jaws and teeth, adapted for chewing tough foods. Lived alongside early Homo until about 1 million years ago.",
    pronunciation: "pair-AN-throh-pus",
    category: "species"
  },
  {
    term: "Homo erectus",
    definition: "An extinct human species that first appeared about 1.9 million years ago. First hominin to leave Africa and to use fire. Survived until approximately 117,000 years ago.",
    pronunciation: "HOH-moh ee-REK-tus",
    category: "species"
  },
  {
    term: "Neanderthal",
    definition: "An extinct human species (Homo neanderthalensis) that lived in Europe and western Asia from about 400,000 to 40,000 years ago. Closely related to Homo sapiens, with whom they interbred.",
    pronunciation: "nee-AN-der-tahl",
    category: "species",
    relatedTerms: ["Denisovan", "admixture"]
  },
  {
    term: "Denisovan",
    definition: "An extinct human population known primarily from DNA extracted from bones found in Denisova Cave, Siberia. Contributed DNA to modern Melanesian and some Asian populations.",
    pronunciation: "deh-NEE-soh-van",
    category: "species",
    relatedTerms: ["Neanderthal", "admixture"]
  },

  // Methods
  {
    term: "Radiometric dating",
    definition: "A method of determining the age of rocks or fossils by measuring the decay of radioactive isotopes. Includes potassium-argon, uranium-series, and radiocarbon dating.",
    category: "method"
  },
  {
    term: "Stratigraphy",
    definition: "The study of rock layers (strata) and their sequence. Older layers are typically below younger ones, helping establish relative ages of fossils.",
    pronunciation: "strah-TIG-ruh-fee",
    category: "method"
  },
  {
    term: "Ancient DNA (aDNA)",
    definition: "Genetic material extracted from ancient biological remains. Has revolutionized our understanding of human evolution, revealing interbreeding between species.",
    category: "method",
    relatedTerms: ["admixture", "genome"]
  },
  {
    term: "Paleomagnetism",
    definition: "Dating method based on the Earth's magnetic field reversals recorded in volcanic rocks. Helps date fossils found in volcanic sediments.",
    category: "method"
  },
  {
    term: "Taphonomy",
    definition: "The study of how organisms decay and become fossilized. Understanding taphonomy helps interpret the fossil record.",
    pronunciation: "tah-FON-oh-mee",
    category: "method"
  },

  // Eras
  {
    term: "Pleistocene",
    definition: "The geological epoch from 2.6 million to 11,700 years ago, characterized by repeated ice ages. Most human evolution occurred during this period.",
    pronunciation: "PLY-stoh-seen",
    category: "era",
    relatedTerms: ["Holocene", "Ice Age"]
  },
  {
    term: "Pliocene",
    definition: "The geological epoch from 5.3 to 2.6 million years ago. Early hominins like Australopithecus evolved during this period.",
    pronunciation: "PLY-oh-seen",
    category: "era"
  },
  {
    term: "Holocene",
    definition: "The current geological epoch, beginning 11,700 years ago after the last ice age. The entire span of human civilization falls within the Holocene.",
    pronunciation: "HOL-oh-seen",
    category: "era"
  },
  {
    term: "Last Glacial Maximum (LGM)",
    definition: "The peak of the last ice age, approximately 26,000-19,000 years ago. Sea levels were about 130 meters lower, exposing land bridges.",
    category: "era"
  },

  // Concepts
  {
    term: "Admixture",
    definition: "The mixing of genetic material from different populations through interbreeding. Modern humans carry DNA from Neanderthals and Denisovans due to ancient admixture events.",
    category: "concept",
    relatedTerms: ["ancient DNA", "introgression"]
  },
  {
    term: "Out of Africa",
    definition: "The scientific consensus that anatomically modern humans evolved in Africa and then dispersed to other continents, replacing or interbreeding with other human species.",
    category: "concept"
  },
  {
    term: "Adaptive introgression",
    definition: "The incorporation of beneficial genes from one species into another through interbreeding. Example: Tibetans carry a Denisovan gene (EPAS1) that helps with high-altitude adaptation.",
    category: "concept",
    relatedTerms: ["admixture"]
  },
  {
    term: "Mosaic evolution",
    definition: "The concept that different traits evolve at different rates, so a species may have some modern features while retaining primitive ones.",
    category: "concept"
  },
  {
    term: "Sexual dimorphism",
    definition: "Physical differences between males and females of a species. Early hominins showed high dimorphism (large size difference); modern humans show less.",
    category: "concept"
  },

  // Tool Industries
  {
    term: "Oldowan",
    definition: "The earliest stone tool industry, dating from about 2.6 million years ago. Consists of simple choppers and flakes. Named after Olduvai Gorge, Tanzania.",
    pronunciation: "OHL-doh-wan",
    category: "tool",
    relatedTerms: ["Acheulean", "Lomekwian"]
  },
  {
    term: "Acheulean",
    definition: "A stone tool industry characterized by bifacial handaxes, dating from 1.76 million years ago. Associated with Homo erectus. Remarkably stable for over a million years.",
    pronunciation: "ash-oo-LAY-an",
    category: "tool",
    relatedTerms: ["Oldowan", "handaxe"]
  },
  {
    term: "Levallois",
    definition: "A sophisticated stone tool technique involving prepared cores to produce flakes of predetermined shape. Appeared around 400,000 years ago.",
    pronunciation: "leh-vah-LWAH",
    category: "tool"
  },
  {
    term: "Middle Stone Age (MSA)",
    definition: "The African stone tool industry from about 300,000 to 30,000 years ago, associated with early Homo sapiens. Includes innovations like heat treatment and hafting.",
    category: "tool"
  },

  // Sites
  {
    term: "Olduvai Gorge",
    definition: "A steep-sided ravine in Tanzania where the Leakeys made groundbreaking hominin discoveries. Contains fossils spanning 2 million years.",
    pronunciation: "OHL-doo-vy",
    category: "site"
  },
  {
    term: "Laetoli",
    definition: "A site in Tanzania famous for 3.66-million-year-old footprints preserved in volcanic ash, providing direct evidence of early bipedalism.",
    pronunciation: "lay-TOH-lee",
    category: "site"
  },
  {
    term: "Jebel Irhoud",
    definition: "A site in Morocco where the oldest known Homo sapiens fossils (approximately 315,000 years old) were discovered.",
    pronunciation: "JEB-el ee-ROOD",
    category: "site"
  },
  {
    term: "Denisova Cave",
    definition: "A cave in Siberia's Altai Mountains where Denisovan remains were discovered. The only site with fossils from Denisovans, Neanderthals, and modern humans.",
    category: "site"
  },
  {
    term: "Rising Star Cave",
    definition: "A cave system in South Africa containing the remains of Homo naledi, a small-brained human species that lived 335,000-236,000 years ago.",
    category: "site"
  }
];

export const getTermsByCategory = (category: GlossaryTerm['category']): GlossaryTerm[] => {
  return glossary.filter(term => term.category === category);
};

export const getTermByName = (name: string): GlossaryTerm | undefined => {
  return glossary.find(term => term.term.toLowerCase() === name.toLowerCase());
};

export const searchGlossary = (query: string): GlossaryTerm[] => {
  const lowerQuery = query.toLowerCase();
  return glossary.filter(
    term =>
      term.term.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery)
  );
};
