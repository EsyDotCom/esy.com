export const IMAGES = {
  turkanaBoyReconstruction: "https://images.esy.com/essays/turkana-boy/homo-erectus-turkana-boy-ausschnitt-fundort-nariokotome-kenia-rekonstruktion-im-neanderthal-museum.c38e9d9266.webp",
  lakeTurkana: "https://images.esy.com/essays/turkana-boy/lake-turkana.df86372a69.webp",
  lakeTurkanaMap: "https://images.esy.com/essays/turkana-boy/lac-turkana.4461025ca6.webp",
  lakeTurkanaEliye: "https://images.esy.com/essays/turkana-boy/view-of-lake-turkana-from-eliye-springs-hotel-resort.85b6e67fa6.webp",
  acheuleanHandaxe: "https://images.esy.com/essays/turkana-boy/lower-palaeolithic-acheulean-bifaced-ovate-flint-hand-axe-findid-1008304.6222612019.webp",
  ergasterSkullDiagram: "https://images.esy.com/essays/turkana-boy/ergaster-skull.73fcef5a7c.webp",
  ergasterSkullReplica: "https://images.esy.com/essays/turkana-boy/homo-ergaster-skull-replica-world-museum-liverpool.1b4c4cdad9.webp",
} as const;

export const IMAGE_CREDITS = [
  {
    subject: "Turkana Boy reconstruction at the Neanderthal Museum",
    attribution: "Neanderthal Museum / Wikimedia Commons, CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:Homo_erectus_-_Turkana_Boy.jpg",
  },
  {
    subject: "Lake Turkana landscape photograph",
    attribution: "Wikimedia Commons, CC BY-SA 2.0",
    url: "https://commons.wikimedia.org/wiki/File:Lake_Turkana.jpg",
  },
  {
    subject: "Lake Turkana geographic map",
    attribution: "Nicolas Eynaud / Wikimedia Commons, CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Lac_Turkana.png",
  },
  {
    subject: "View of Lake Turkana from Eliye Springs",
    attribution: "Wikimedia Commons, CC BY-SA 4.0",
    url: "https://commons.wikimedia.org/wiki/File:View_Of_Lake_Turkana_From_Eliye_Springs_Hotel_Resort.JPG",
  },
  {
    subject: "Acheulean bifaced ovate hand axe",
    attribution: "Portable Antiquities Scheme / Wikimedia Commons, CC BY 2.0",
    url: "https://commons.wikimedia.org/wiki/File:Lower_Palaeolithic_Acheulean_Hand_Axe.jpg",
  },
  {
    subject: "Homo ergaster skull diagram",
    attribution: "Jose-Manuel Benito / Wikimedia Commons, CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Ergaster_skull.png",
  },
  {
    subject: "Homo ergaster skull replica, World Museum Liverpool",
    attribution: "Johnbod / Wikimedia Commons, CC BY-SA 3.0",
    url: "https://commons.wikimedia.org/wiki/File:Homo_ergaster_skull_replica,_World_Museum_Liverpool.jpg",
  },
] as const;

export const SOURCES = [
  { id: "1", ref: "Brown et al. 1985", text: "Brown, F., Harris, J., Leakey, R., & Walker, A. (1985). Early Homo erectus skeleton from west Lake Turkana, Kenya. Nature, 316, 788–792.", doi: "10.1038/316788a0" },
  { id: "2", ref: "Walker & Leakey 1993", text: "Walker, A. & Leakey, R. (1993). The Nariokotome Homo erectus Skeleton. Harvard University Press." },
  { id: "3", ref: "Smith 1993", text: "Smith, B.H. (1993). The physiological age of KNM-WT 15000. In Walker & Leakey (eds.), The Nariokotome Homo erectus Skeleton, pp. 195–220." },
  { id: "4", ref: "Smith 2004", text: "Smith, B.H. (2004). Sequence of emergence of the permanent teeth. American Journal of Human Biology, 6(1), 61–76.", doi: "10.1002/ajhb.1310060109" },
  { id: "5", ref: "Dean et al. 2001", text: "Dean, M.C. et al. (2001). Histological reconstruction of dental development and age at death. American Journal of Physical Anthropology, 91(4), 401–419." },
  { id: "6", ref: "Ruff & Walker 1993", text: "Ruff, C.B. & Walker, A. (1993). Body size and body shape. In Walker & Leakey (eds.), The Nariokotome Homo erectus Skeleton, pp. 234–265." },
  { id: "7", ref: "Wheeler 1991", text: "Wheeler, P.E. (1991). The thermoregulatory advantages of hominid bipedalism in open equatorial environments. Journal of Human Evolution, 21(2), 107–115.", doi: "10.1016/0047-2484(91)90002-D" },
  { id: "8", ref: "Wheeler 1993", text: "Wheeler, P.E. (1993). The influence of stature and body form on hominid energy and water budgets. Journal of Human Evolution, 24(1), 13–28.", doi: "10.1006/jhev.1993.1003" },
  { id: "9", ref: "Latimer & Ohman 2001", text: "Latimer, B. & Ohman, J.C. (2001). Axial dysplasia in Homo erectus. Journal of Human Evolution, 40(1), 12–27.", doi: "10.1006/jhev.2000.0344" },
  { id: "10", ref: "MacLarnon 1993", text: "MacLarnon, A. (1993). The vertebral canal. In Walker & Leakey (eds.), The Nariokotome Homo erectus Skeleton, pp. 359–390." },
  { id: "11", ref: "Meyer & Haeusler 2015", text: "Meyer, M.R. & Haeusler, M. (2015). Spinal cord evolution in early Homo. Journal of Human Evolution, 88, 43–53.", doi: "10.1016/j.jhevol.2015.09.001" },
  { id: "12", ref: "Pontzer 2012", text: "Pontzer, H. (2012). Ecological energetics in early Homo. Current Anthropology, 53(S6), S346–S358.", doi: "10.1086/667402" },
  { id: "13", ref: "Bramble & Lieberman 2004", text: "Bramble, D.M. & Lieberman, D.E. (2004). Endurance running and the evolution of Homo. Nature, 432, 345–352.", doi: "10.1038/nature03052" },
  { id: "14", ref: "Lordkipanidze et al. 2007", text: "Lordkipanidze, D. et al. (2007). Postcranial evidence from early Homo from Dmanisi, Georgia. Nature, 449, 305–310.", doi: "10.1038/nature06134" },
  { id: "15", ref: "Leakey & Lewin 1992", text: "Leakey, R. & Lewin, R. (1992). Origins Reconsidered: In Search of What Makes Us Human. Doubleday." },
  { id: "16", ref: "Antón 2003", text: "Antón, S.C. (2003). Natural history of Homo erectus. Yearbook of Physical Anthropology, 46, 126–170.", doi: "10.1002/ajpa.10399" },
] as const;
