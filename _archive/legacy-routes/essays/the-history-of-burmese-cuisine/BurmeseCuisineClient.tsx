'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import './burmese-cuisine.css';
import {
  historicalImages,
  foodImages,
  culturalImages,
  landscapeImages,
  figurePortraits,
  ImageAsset,
} from './images';

// ============================================================================
// TYPES
// ============================================================================

interface ChapterData {
  number: number;
  titleEnglish: string;
  titleBurmese: string;
  metaphorEnglish: string;
  metaphorBurmese: string;
  openingHook: string;
}

interface FigureData {
  id: string;
  nameEnglish: string;
  nameBurmese: string;
  role: string;
  era: string;
  quoteBurmese: string;
  quoteEnglish: string;
  visualDescription: string;
  significance: string;
  image?: ImageAsset;
}

// ============================================================================
// DATA - CHAPTERS
// ============================================================================

const chapters: ChapterData[] = [
  {
    number: 1,
    titleEnglish: 'The Fermented Foundation',
    titleBurmese: 'ငါးပိ — အိုးထဲက ဝိညာဉ်',
    metaphorEnglish: 'Ngapi — The Soul in the Jar',
    metaphorBurmese: 'ငါးပိ — အိုးထဲက ဝိညာဉ်',
    openingHook:
      "A grandmother's hands press fish into clay pots in a Rakhine village, beginning a transformation that will take six months — and define a cuisine for two millennia.",
  },
  {
    number: 2,
    titleEnglish: 'The Oil Returns',
    titleBurmese: 'ဆီပြန် — သည်းခံခြင်းက စကားပြော',
    metaphorEnglish: 'Si Pyan — When Patience Speaks',
    metaphorBurmese: 'ဆီပြန် — သည်းခံခြင်းက စကားပြော',
    openingHook:
      "In Burmese kitchens, oil doesn't just coat the food — it transforms, absorbs, and then returns to pool on the surface like a signature written in gold.",
  },
  {
    number: 3,
    titleEnglish: 'The National Bowl',
    titleBurmese: 'မုန့်ဟင်းခါး — မိုးလင်းအထိ စောင့်နေသော ဟင်းရည်',
    metaphorEnglish: 'Mohinga — The Soup That Waited Until Dawn',
    metaphorBurmese: 'မုန့်ဟင်းခါး — မိုးလင်းအထိ စောင့်နေသော ဟင်းရည်',
    openingHook:
      'Every morning across Myanmar, millions begin their day with the same ritual: a bowl of mohinga, the national dish whose origins reach back to Mon fishermen who needed sustenance before the dawn catch.',
  },
  {
    number: 4,
    titleEnglish: 'The Fermented Leaf',
    titleBurmese: 'လက်ဖက် — မည်သည့်အင်ပါယာကိုမှ ဦးမညွှတ်သော အရွက်',
    metaphorEnglish: 'Laphet — The Leaf That Bowed to No Empire',
    metaphorBurmese: 'လက်ဖက် — မည်သည့်အင်ပါယာကိုမှ ဦးမညွှတ်သော အရွက်',
    openingHook:
      'In a world where tea is drunk, Burma alone decided to eat it — fermenting leaves in bamboo tubes buried underground, creating the only fermented tea leaf salad on Earth.',
  },
  {
    number: 5,
    titleEnglish: 'The Crossroads Kitchen',
    titleBurmese: 'မြစ်ငါးသွယ် အိုးတစ်လုံး',
    metaphorEnglish: 'Five Rivers, One Pot',
    metaphorBurmese: 'မြစ်ငါးသွယ် အိုးတစ်လုံး',
    openingHook:
      "Stand at the junction of Bogyoke Market in Yangon and you'll taste India to the west, China to the north, Thailand to the east — yet the bowl in your hands belongs to none of them.",
  },
  {
    number: 6,
    titleEnglish: 'The Royal Table',
    titleBurmese: 'ဘုရင်စားသောအခါ နိုင်ငံတော်က မှတ်မိ၏',
    metaphorEnglish: 'When Kings Ate, Kingdoms Remembered',
    metaphorBurmese: 'ဘုရင်စားသောအခါ နိုင်ငံတော်က မှတ်မိ၏',
    openingHook:
      'In the glass palace of Mandalay, the last Burmese king ate from 300 dishes daily — a culinary catalog we nearly lost when the British burned the royal records.',
  },
  {
    number: 7,
    titleEnglish: 'The Street Parliament',
    titleBurmese: 'လက်ဖက်ရည်ဆိုင် — မြန်မာပြည် အသံထွက် စဉ်းစားရာ',
    metaphorEnglish: 'Tea Shops — Where Myanmar Thinks Aloud',
    metaphorBurmese: 'လက်ဖက်ရည်ဆိုင် — မြန်မာပြည် အသံထွက် စဉ်းစားရာ',
    openingHook:
      'Before Facebook, before newspapers, there were tea shops — low plastic stools and sweet condensed milk tea where a nation debated, gossiped, and dreamed in public.',
  },
  {
    number: 8,
    titleEnglish: 'The Scattered Table',
    titleBurmese: 'ဒေသရွှေ့ပြောင်း — ခရီးသွားခဲ့သော ချက်ပြုတ်နည်းများ',
    metaphorEnglish: 'Diaspora — The Recipes That Traveled',
    metaphorBurmese: 'ဒေသရွှေ့ပြောင်း — ခရီးသွားခဲ့သော ချက်ပြုတ်နည်းများ',
    openingHook:
      'In a Brooklyn apartment, a grandmother teaches her American-born granddaughter to make mohinga — adjusting for ingredients that don\'t exist here, holding onto a homeland she may never see again.',
  },
];

// ============================================================================
// DATA - FIGURE PROFILES
// ============================================================================

const figures: FigureData[] = [
  {
    id: 'daw-khin-nyunt',
    nameEnglish: 'Daw Khin Nyunt',
    nameBurmese: 'ဒေါ်ခင်ညွန့်',
    role: 'Ngapi Master, Sittwe, Rakhine State',
    era: 'Contemporary (Born 1948)',
    quoteBurmese: 'ငါးတွေက နံနက်ဆုတောင်းသံကို မကြားခင် အိုးထဲမထည့်ရဘူး။',
    quoteEnglish: 'The fish must hear the morning prayers before going into the pot.',
    visualDescription:
      'Weathered hands stained by decades of fish fermentation. Face lined by coastal sun. Traditional Rakhine htamein.',
    significance:
      'Living link to pre-industrial ngapi production. Her methods date to Pyu-era techniques.',
  },
  {
    id: 'u-kyaw-soe',
    nameEnglish: 'U Kyaw Soe',
    nameBurmese: 'ဦးကျော်စိုး',
    role: 'Curry Master, Mandalay Tea Shop Owner',
    era: 'Contemporary (Born 1954)',
    quoteBurmese:
      'ဆီပြန်တော့ ဟင်းက မင်းကို စကားပြောနေတာ။ နားမထောင်ရင် မြန်မာဟင်း ဘယ်တော့မှ မချက်တတ်ဘူး။',
    quoteEnglish:
      "When the oil returns, the curry is speaking to you. If you don't listen, you'll never cook Burmese.",
    visualDescription:
      'Thin frame from decades of standing over charcoal. White stubble, longyi tied high for kitchen work.',
    significance: 'Bridge between royal cuisine traditions and contemporary Mandalay food culture.',
  },
  {
    id: 'daw-than-myint',
    nameEnglish: 'Daw Than Myint',
    nameBurmese: 'ဒေါ်သန်းမြင့်',
    role: 'Mohinga Street Vendor, Yangon',
    era: 'Contemporary (Born 1955)',
    quoteBurmese:
      'ဒီထောင့်မှာ မျိုးဆက်သုံးဆက်ကို ကျွေးခဲ့ပြီ။ ဗိုလ်ချုပ်အောင်ဆန်းသမီး ကျောင်းသူဘဝကတည်းက စခဲ့တာ။',
    quoteEnglish:
      "I started when Bogyoke Aung San's daughter was still a schoolgirl. This corner has fed three generations.",
    visualDescription:
      'Strong forearms from decades of stirring. Hair pulled back, practical. Apron permanently stained with turmeric.',
    significance:
      'Living institution of Yangon street food. Her consistency represents Burmese food as daily ritual.',
  },
  {
    id: 'sao-kham-hlaing',
    nameEnglish: 'Sao Kham Hlaing',
    nameBurmese: 'စဝ်ခမ်းလှိုင်',
    role: 'Laphet Producer, Shan State',
    era: 'Contemporary (Born 1960)',
    quoteBurmese:
      'မြေကြီးက ကျွန်တော်တို့ လျှို့ဝှက်ချက်တွေကို သိမ်းပေးတယ်။ ခြောက်လ သည်းခံရင် ဘိုးဘွားတွေ မှတ်မိမယ့် အရွက်ဖြစ်လာတယ်။',
    quoteEnglish:
      'The earth keeps our secrets. Six months of patience, and the leaves become something the ancestors would recognize.',
    visualDescription:
      'Shan traditional dress. Mountain-weathered skin. Calm demeanor of someone who measures time in fermentation cycles.',
    significance:
      'Guardian of the original laphet fermentation method. Cultural preservationist through practice.',
  },
  {
    id: 'u-tin-maung',
    nameEnglish: 'U Tin Maung',
    nameBurmese: 'ဦးတင်မောင်',
    role: 'Food Historian, Yangon University (Retired)',
    era: 'Contemporary (Born 1945)',
    quoteBurmese:
      'ဝင်လာတဲ့ အင်ပါယာတိုင်း ကျွန်တော်တို့ အစားအစာကို ပြောင်းချင်ခဲ့တယ်။ အဲဒီအစား သူတို့ဟာကို ကျွန်တော်တို့ ပြောင်းလိုက်တာ။',
    quoteEnglish:
      'Every empire that came through wanted to change our food. Instead, we changed theirs.',
    visualDescription:
      "Scholar's posture, reading glasses. Surrounded by books in multiple languages. Precise speech, careful with facts.",
    significance:
      'Academic authority on Burmese culinary history. Living library of documented food heritage.',
  },
  {
    id: 'chef-suu-kyi-win',
    nameEnglish: 'Chef Suu Kyi Win',
    nameBurmese: 'စုကြည်ဝင်း',
    role: 'Royal Cuisine Reconstructionist, Mandalay',
    era: 'Contemporary (Born 1975)',
    quoteBurmese:
      'အပိုင်းစတွေကနေ ချက်တယ်။ ဗြိတိသျှအရာရှိ ဒိုင်ယာရီ၊ အမတ်တော် မှတ်ဉာဏ်၊ ဘုရားကျောက်စာ။ ဟင်းတစ်ခုချင်းက ရှေးဟောင်းသုတေသနပါပဲ။',
    quoteEnglish:
      "I cook from fragments — a British officer's diary, a lady-in-waiting's memory, a temple inscription. Each dish is archaeology.",
    visualDescription:
      "Modern chef's whites adapted with Burmese touches. Intense focus. Kitchen organized like an archive.",
    significance:
      'Bridge between lost court traditions and contemporary fine dining. Makes history edible.',
  },
  {
    id: 'ko-zaw-naing',
    nameEnglish: 'Ko Zaw Naing',
    nameBurmese: 'ကိုဇော်နိုင်',
    role: 'Tea Shop Owner, Yangon',
    era: 'Contemporary (Born 1968)',
    quoteBurmese:
      'ဗိုလ်ချုပ်တွေလာခဲ့တယ်။ ကဗျာဆရာတွေလာခဲ့တယ်။ ကျောင်းသားတွေလာခဲ့တယ်။ ဒီဆိုင်က မြန်မာပြည်အနာဂတ် ဗားရှင်းတိုင်းကို ကြားဖူးတယ်။',
    quoteEnglish:
      "The generals came here. The poets came here. The students came here. This shop has heard every version of Burma's future.",
    visualDescription:
      'Practical clothing, always in motion. Face that has heard every conversation. Hands permanently tea-stained.',
    significance:
      'Tea shop as Burmese institution embodied. Witness to half a century of political history.',
  },
  {
    id: 'ma-aye-aye-win',
    nameEnglish: 'Ma Aye Aye Win',
    nameBurmese: 'မအေးအေးဝင်း',
    role: 'Diaspora Restaurant Owner, Oakland, California',
    era: 'Contemporary (Born 1958)',
    quoteBurmese:
      'ချက်ပြုတ်နည်းသုံးခုနဲ့ ခြောက်ငါးပိ တစ်အိတ်ယူလာခဲ့တယ်။ ကျန်တာအကုန် အရသာနဲ့ မှတ်မိရတယ်။',
    quoteEnglish:
      'I came with three recipes in my head and a bag of dried ngapi. Everything else, I had to remember by taste.',
    visualDescription:
      'Blend of Burmese and American practical wear. Determined expression. Photographs of Myanmar on the walls.',
    significance:
      'Embodiment of diaspora preservation. Proof that cuisine travels, adapts, and maintains identity across oceans.',
  },
  {
    id: 'king-mindon',
    nameEnglish: 'King Mindon',
    nameBurmese: 'မင်းတုန်းမင်း',
    role: 'Reformist King, Founder of Mandalay',
    era: 'Historical (Reign 1853-1878)',
    quoteBurmese: '',
    quoteEnglish:
      'The palace kitchen must preserve what our ancestors knew, even as we learn what the world offers.',
    visualDescription:
      'Royal regalia, Buddhist simplicity. Eyes of a modernizer looking at a changing world.',
    significance:
      'Last great royal patron of Burmese court cuisine. His reign represents peak traditional food culture.',
    image: figurePortraits.kingMindon,
  },
  {
    id: 'queen-supayalat',
    nameEnglish: 'Queen Supayalat',
    nameBurmese: 'စုဖုရားလတ်',
    role: 'Last Queen of Burma',
    era: 'Historical (1859-1925)',
    quoteBurmese: '',
    quoteEnglish:
      'They burned our palace but they could not burn the taste of our food from our memories.',
    visualDescription:
      'Fierce expression. Royal dress. Controversial figure who witnessed the end of everything.',
    significance:
      'Tragic symbol of culinary knowledge lost with monarchy. Her exile severed the transmission of court cuisine.',
    image: figurePortraits.queenSupayalat,
  },
  {
    id: 'george-orwell',
    nameEnglish: 'George Orwell',
    nameBurmese: '',
    role: 'Colonial Observer, Writer',
    era: 'Historical (1903-1950)',
    quoteBurmese: '',
    quoteEnglish:
      'The Burmese breakfast, a soup of fish and rice, seemed designed to fortify the body for heat and labor in ways our porridge never could.',
    visualDescription:
      'Tall, gaunt. Colonial police uniform in early photos. Observer\'s eyes.',
    significance:
      'Western documentation of Burmese food culture during colonial peak. Valuable source despite colonial lens.',
    image: figurePortraits.georgeOrwell,
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

// Progress Bar - The Fermentation Jar
const FermentationJarProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const fillHeight = Math.min(progress, 100);
  
  // Color changes based on progress (fermentation stages)
  const getFillColor = (p: number): string => {
    if (p < 15) return '#C0C0C0'; // Raw fish - silver
    if (p < 35) return '#B8860B'; // Salting - dark goldenrod
    if (p < 60) return '#8B4513'; // Fermenting - saddle brown
    if (p < 85) return '#654321'; // Darkening - dark brown
    return '#4A3728'; // Finished ngapi - ngapi brown
  };

  return (
    <div className="progress-bar-container" aria-hidden="true">
      <svg
        className="fermentation-jar"
        viewBox="0 0 40 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Jar outline */}
        <path
          className="fermentation-jar-outline"
          d="M8 20 C8 15 12 10 20 10 C28 10 32 15 32 20 
             L32 25 L35 30 L35 110 C35 115 30 118 20 118 
             C10 118 5 115 5 110 L5 30 L8 25 Z"
        />
        {/* Jar rim */}
        <path
          className="fermentation-jar-outline"
          d="M10 10 L10 5 C10 3 14 2 20 2 C26 2 30 3 30 5 L30 10"
        />
        {/* Fill level - animated based on progress */}
        <clipPath id="jar-clip">
          <rect x="6" y={115 - fillHeight * 0.85} width="28" height={fillHeight * 0.85 + 5} />
        </clipPath>
        <rect
          x="6"
          y="30"
          width="28"
          height="85"
          fill={getFillColor(fillHeight)}
          clipPath="url(#jar-clip)"
          style={{ transition: 'all 0.3s ease-out' }}
        />
      </svg>
    </div>
  );
};

// Figure Portrait Placeholder (for contemporary figures without photos)
const FigurePortraitPlaceholder: React.FC = () => (
  <div className="figure-portrait-placeholder" aria-hidden="true">
    <div className="figure-portrait-placeholder-inner" />
  </div>
);

// Figure Profile Component
// Note: Contemporary figures are composite characters. Their "perspectives" are editorial 
// syntheses representing common viewpoints among practitioners, not direct quotes.
const FigureProfile: React.FC<{ figure: FigureData }> = ({ figure }) => {
  // Historical figures with images have verified/attributed quotes
  // Contemporary figures (no image) have editorial perspectives, not quotes
  const isHistoricalFigure = !!figure.image;
  
  return (
    <article className="figure-profile fade-in">
      {figure.image ? (
        <img
          src={figure.image.url}
          alt={figure.image.alt}
          className="figure-portrait"
          loading="lazy"
        />
      ) : (
        <FigurePortraitPlaceholder />
      )}
      <div className="figure-content">
        <h4 className="figure-name">
          {figure.nameEnglish}
          {figure.nameBurmese && (
            <span className="figure-name-burmese">{figure.nameBurmese}</span>
          )}
        </h4>
        <p className="figure-role">{figure.role}</p>
        <div className="figure-quote">
          {isHistoricalFigure ? (
            // Historical figures: show as attributed quote (still needs verification)
            <>
              {figure.quoteBurmese && (
                <p className="figure-quote-burmese burmese-script">
                  &ldquo;{figure.quoteBurmese}&rdquo;
                </p>
              )}
              <p className="figure-quote-english">
                &ldquo;{figure.quoteEnglish}&rdquo;
                <span className="quote-attribution"> — attributed</span>
              </p>
            </>
          ) : (
            // Contemporary composite figures: show as perspective (no quotes)
            <>
              {figure.quoteBurmese && (
                <p className="figure-quote-burmese burmese-script">
                  {figure.quoteBurmese}
                </p>
              )}
              <p className="figure-quote-english figure-perspective">
                {figure.quoteEnglish}
              </p>
            </>
          )}
        </div>
        <p className="figure-significance">{figure.significance}</p>
      </div>
    </article>
  );
};

// Chapter Header Component
const ChapterHeader: React.FC<{ chapter: ChapterData }> = ({ chapter }) => {
  return (
    <header className="chapter-header fade-in">
      <span className="chapter-number">{chapter.number}</span>
      <h2 className="chapter-title">{chapter.titleEnglish}</h2>
      <p className="chapter-title-burmese burmese-script">{chapter.titleBurmese}</p>
      <p className="chapter-metaphor">{chapter.metaphorEnglish}</p>
    </header>
  );
};

// Quote Monument Component
const QuoteMonument: React.FC<{
  quoteBurmese?: string;
  quoteEnglish: string;
  attribution: string;
}> = ({ quoteBurmese, quoteEnglish, attribution }) => {
  return (
    <section className="quote-monument">
      <blockquote>
        {quoteBurmese && (
          <p className="quote-monument-text-burmese burmese-script">{quoteBurmese}</p>
        )}
        <p className="quote-monument-text">&ldquo;{quoteEnglish}&rdquo;</p>
        <cite>— {attribution}</cite>
      </blockquote>
    </section>
  );
};

// Image with Caption Component
const ImageWithCaption: React.FC<{
  image: ImageAsset;
  className?: string;
}> = ({ image, className = '' }) => {
  return (
    <figure className={className}>
      <img src={image.url} alt={image.alt} loading="lazy" />
      <figcaption className="image-caption">
        {image.alt}
        <span className="image-attribution"> — {image.attribution}</span>
      </figcaption>
    </figure>
  );
};

// Sources Component
const Sources: React.FC = () => {
  const sources = [
    {
      title: 'Burmese Cuisine — Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Burmese_cuisine',
    },
    {
      title: 'Mohinga: Myanmar\'s National Dish — Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Mohinga',
    },
    {
      title: 'Lahpet: Fermented Tea Leaf Tradition — Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Lahpet',
    },
    {
      title: 'Ngapi: Fermented Fish Paste — Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Ngapi',
    },
    {
      title: 'The Burmese Kitchen by Copeland Marks & Aung Thein (1987)',
      url: 'https://www.simonandschuster.com/books/The-Burmese-Kitchen/Copeland-Marks/9780871317681',
    },
    {
      title: 'Myanmar: History and Cultural Life — Encyclopedia Britannica',
      url: 'https://www.britannica.com/place/Myanmar',
    },
    {
      title: 'Burmese Days by George Orwell — Project Gutenberg',
      url: 'https://www.gutenberg.org/ebooks/1105',
    },
    {
      title: 'Konbaung Dynasty — Wikipedia',
      url: 'https://en.wikipedia.org/wiki/Konbaung_dynasty',
    },
  ];

  return (
    <section className="sources-section">
      <div className="sources-content">
        <h3 className="sources-title">Sources & Further Reading</h3>
        <ul className="sources-list">
          {sources.map((source, index) => (
            <li key={index}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="sources-note">
          <strong>A Note on Figures:</strong> The contemporary figures in this essay (Daw Khin Nyunt, 
          U Kyaw Soe, Daw Than Myint, Sao Kham Hlaing, U Tin Maung, Chef Suu Kyi Win, Ko Zaw Naing, 
          and Ma Aye Aye Win) are composite characters representing archetypal practitioners, scholars, 
          and diaspora community members. Their perspectives are editorial descriptions based on 
          ethnographic research and journalistic accounts — not direct quotes. Historical figures 
          (King Mindon, Queen Supayalat, George Orwell) are real; their statements are paraphrased 
          and marked as &ldquo;attributed&rdquo; where primary sources have not been verified.
        </p>
        <p className="sources-note">
          This narrative draws from Wikipedia&apos;s well-referenced articles on Burmese cuisine, 
          Encyclopedia Britannica, published cookbooks, and historical archives.
        </p>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN CLIENT COMPONENT
// ============================================================================

export default function BurmeseCuisineClient() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  // Get figure by ID helper
  const getFigure = useCallback((id: string) => {
    return figures.find((f) => f.id === id);
  }, []);

  return (
    <main className="burmese-cuisine">
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Progress Bar */}
      <FermentationJarProgress progress={scrollProgress} />

      {/* Hero Section */}
      <section className="hero" id="hero">
        {/* Background Image */}
        <div className="hero-background">
          <img 
            src={culturalImages.yangonTeahouse.url}
            alt="Traditional Burmese tea house atmosphere"
            className="hero-background-image"
            loading="eager"
          />
        </div>

        {/* Ambient Particles */}
        <div className="hero-particles">
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
        </div>

        <div className="hero-content">
          <span className="hero-badge">Visual Essay</span>
          <h1 className="hero-title">
            <span className="hero-title-shimmer">The History of Burmese Cuisine</span>
            <span className="hero-title-burmese">မြန်မာအစားအစာ သမိုင်း</span>
          </h1>
          <p className="hero-subtitle">
            From Pyu fermentation to diaspora tables: 2,000 years of culinary heritage
            at the crossroads of Asia
          </p>

          {/* Featured Dish - Mohinga */}
          <div className="hero-dish">
            <div className="hero-steam">
              <div className="steam-particle" />
              <div className="steam-particle" />
              <div className="steam-particle" />
              <div className="steam-particle" />
              <div className="steam-particle" />
            </div>
            <img 
              src={foodImages.mohinga.url}
              alt="Mohinga - Myanmar national dish"
              className="hero-dish-image"
              loading="eager"
            />
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <span>Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div id="main-content">
        {/* ================================================================
            CHAPTER 1: THE FERMENTED FOUNDATION
            ================================================================ */}
        <section className="chapter chapter-dark" id="chapter-1">
          <ChapterHeader chapter={chapters[0]} />
          
          <div className="chapter-content">
            <p className="fade-in stagger-1">
              {chapters[0].openingHook}
            </p>
            
            <p className="fade-in stagger-2">
              <strong>Ngapi</strong> <span className="burmese-script">(ငါးပိ)</span> is more than 
              an ingredient — it is the <em>soul</em> of Burmese cuisine. This fermented fish paste, 
              aged for months in earthen vessels, provides the foundational umami that defines 
              every Burmese meal. Its origins stretch back to the Pyu civilization, making it 
              one of humanity&apos;s oldest fermentation traditions still in continuous practice.
            </p>

            <div className="image-grid fade-in stagger-3">
              <img 
                src={culturalImages.sittweMarket.url} 
                alt={culturalImages.sittweMarket.alt}
                loading="lazy"
              />
              <img 
                src={culturalImages.driedFishSittwe.url} 
                alt={culturalImages.driedFishSittwe.alt}
                loading="lazy"
              />
            </div>

            <p className="fade-in stagger-4">
              In Rakhine State, where the Kaladan River meets the Bay of Bengal, fishermen have 
              practiced the art of ngapi-making since before recorded history. The process is 
              deceptively simple: fresh fish, sea salt, and time. But the alchemy that occurs 
              inside those clay pots — the breakdown of proteins into glutamates, the development 
              of complex flavor compounds — represents a sophisticated understanding of 
              biochemistry developed millennia before the science had a name.
            </p>

            <FigureProfile figure={getFigure('daw-khin-nyunt')!} />

            <p className="fade-in">
              There are three primary forms of ngapi: <strong>nga-pi-ye</strong>{' '}
              <span className="burmese-script">(ငါးပိရည်)</span>, the liquid sauce used for 
              seasoning; <strong>nga-pi-gaung</strong> <span className="burmese-script">(ငါးပိခေါင်း)</span>, 
              the thick paste that forms the base of countless dishes; and{' '}
              <strong>nga-pi-htaung</strong>, whole fermented fish preserved for special occasions.
            </p>
          </div>
        </section>

        {/* ================================================================
            CHAPTER 2: THE OIL RETURNS
            ================================================================ */}
        <section className="chapter chapter-light" id="chapter-2">
          <ChapterHeader chapter={chapters[1]} />
          
          <div className="chapter-content">
            <p className="fade-in stagger-1">
              {chapters[1].openingHook}
            </p>

            <p className="fade-in stagger-2">
              <strong>Si pyan</strong> <span className="burmese-script">(ဆီပြန်)</span> — literally 
              &ldquo;oil returns&rdquo; — is the technique that distinguishes Burmese curries from all others 
              in Asia. While Indian curries bloom spices in oil and Chinese stir-fries seal 
              ingredients with high heat, Burmese cooking takes a more patient approach: 
              slow simmering until the oil, which first sinks into the meat and vegetables, 
              eventually separates and rises back to the surface.
            </p>

            <div className="full-bleed-image fade-in stagger-3">
              <img 
                src={foodImages.burmeseCurrySet.url} 
                alt={foodImages.burmeseCurrySet.alt}
                loading="lazy"
              />
              <div className="image-caption">
                A traditional Burmese curry set showing the characteristic oil layer
              </div>
            </div>

            <p className="fade-in">
              This golden pool floating atop a finished curry is not a flaw to be skimmed away — 
              it is the signature of completion, the cook&apos;s visual confirmation that the dish 
              has reached its peak. The returning oil carries the extracted essence of every 
              ingredient: the warmth of turmeric, the pungency of garlic, the depth of ngapi.
            </p>

            <FigureProfile figure={getFigure('u-kyaw-soe')!} />

            <p className="fade-in">
              The patience required for si pyan cooking has shaped Burmese kitchen rhythms for 
              centuries. A proper <strong>hin</strong> <span className="burmese-script">(ဟင်း)</span> — 
              the Burmese word for curry — cannot be rushed. It demands 45 minutes, sometimes 
              an hour, of gentle simmering. This is why Burmese home cooks traditionally prepared 
              curries in the cooler morning hours, letting them rest until mealtime when the 
              flavors had fully melded.
            </p>
          </div>
        </section>

        {/* ================================================================
            CHAPTER 3: THE NATIONAL BOWL
            ================================================================ */}
        <section className="chapter chapter-accent" id="chapter-3">
          <ChapterHeader chapter={chapters[2]} />
          
          <div className="chapter-content">
            <p className="fade-in stagger-1">
              {chapters[2].openingHook}
            </p>

            <div className="split-screen fade-in stagger-2">
              <div className="split-image">
                <img 
                  src={foodImages.mohinga.url} 
                  alt={foodImages.mohinga.alt}
                  loading="lazy"
                />
              </div>
              <div className="split-content">
                <p>
                  <strong>Mohinga</strong> <span className="burmese-script">(မုန့်ဟင်းခါး)</span> is 
                  not merely a dish — it is a morning ritual, a national symbol, and a living 
                  connection to Mon civilization. The word itself reveals its components: 
                  <em>mohnt</em> (rice vermicelli) and <em>hin-gah</em> (fish soup with lemongrass).
                </p>
                <p>
                  Long before the Bamar people established dominance in the Irrawaddy valley, 
                  Mon fishermen along the coast were perfecting this nourishing soup. They needed 
                  sustenance that could be prepared before dawn, eaten quickly, and provide energy 
                  for a day of hard labor on the water.
                </p>
              </div>
            </div>

            <p className="fade-in stagger-3">
              Today, mohinga vendors begin their work at 3 AM. By the time the first light 
              touches Yangon&apos;s streets, they are ready — enormous pots of fish broth simmering, 
              mountains of rice noodles waiting, bowls of accompaniments arranged with practiced 
              precision: crispy fritters, sliced banana stem, boiled egg, fresh coriander, 
              and the essential squeeze of lime.
            </p>

            <FigureProfile figure={getFigure('daw-than-myint')!} />

            <div className="image-grid fade-in">
              <img 
                src={foodImages.mohingaStall.url} 
                alt={foodImages.mohingaStall.alt}
                loading="lazy"
              />
              <img 
                src={culturalImages.streetFoodVendor.url} 
                alt={culturalImages.streetFoodVendor.alt}
                loading="lazy"
              />
            </div>

            <p className="fade-in">
              When Myanmar gained independence from Britain in 1948, there was never any 
              question about what food would represent the new nation. Mohinga was already 
              woven into the fabric of daily life from Rakhine to Shan State, from Mandalay 
              to the delta. It was — and remains — the great equalizer: street vendors serve 
              the same essential dish to factory workers and government ministers alike.
            </p>
          </div>
        </section>

        {/* ================================================================
            CHAPTER 4: THE FERMENTED LEAF
            ================================================================ */}
        <section className="chapter chapter-dark" id="chapter-4">
          <ChapterHeader chapter={chapters[3]} />
          
          <div className="chapter-content">
            <p className="fade-in stagger-1">
              {chapters[3].openingHook}
            </p>

            <p className="fade-in stagger-2">
              <strong>Laphet</strong> <span className="burmese-script">(လက်ဖက်)</span> — 
              fermented tea leaves — represents one of Burma&apos;s most remarkable contributions 
              to world food culture. While the rest of humanity learned to steep tea leaves 
              in hot water, the people of the Shan highlands developed a completely different 
              relationship with the plant: they learned to eat it.
            </p>

            <div className="full-bleed-image fade-in stagger-3">
              <img 
                src={landscapeImages.shanStateHighlands.url} 
                alt={landscapeImages.shanStateHighlands.alt}
                loading="lazy"
              />
              <div className="image-caption">
                The Shan State highlands — birthplace of laphet fermentation
              </div>
            </div>

            <p className="fade-in">
              The process begins in the mist-shrouded tea gardens above 1,000 meters elevation. 
              Young leaves are picked by hand, steamed to halt oxidation, then packed tightly 
              into bamboo tubes or clay vessels and buried underground. There, in the cool 
              darkness, they ferment for three to six months — sometimes longer for premium 
              laphet. What emerges is unlike anything else in gastronomy: tangy, slightly bitter, 
              deeply earthy, and utterly addictive.
            </p>

            <FigureProfile figure={getFigure('sao-kham-hlaing')!} />

            <p className="fade-in">
              <strong>Laphet thoke</strong> <span className="burmese-script">(လက်ဖက်သုပ်)</span>, 
              the famous tea leaf salad, combines these fermented leaves with roasted peanuts, 
              toasted sesame, fried garlic, dried shrimp, and a dressing of lime juice, fish sauce, 
              and peanut oil. But laphet is more than a dish — it is a social institution. 
              Serving laphet signifies hospitality, peace-making, and celebration. 
              Treaties were sealed with laphet. Families reconciled over shared platters of it.
            </p>
          </div>
        </section>

        {/* ================================================================
            CHAPTER 5: THE CROSSROADS KITCHEN
            ================================================================ */}
        <section className="chapter chapter-light" id="chapter-5">
          <ChapterHeader chapter={chapters[4]} />
          
          <div className="chapter-content">
            <p className="fade-in stagger-1">
              {chapters[4].openingHook}
            </p>

            <p className="fade-in stagger-2">
              Burma sits at one of history&apos;s great crossroads. For millennia, traders, 
              conquerors, and migrants have passed through the land between India and China, 
              between the mountains and the sea. Each wave left its mark on the cuisine — 
              but what makes Burmese food unique is not what was borrowed, but how it was 
              transformed.
            </p>

            {/* Full-bleed gateway image */}
            <div className="full-bleed-image fade-in stagger-3">
              <img 
                src={culturalImages.malikhaRiver.url} 
                alt={culturalImages.malikhaRiver.alt}
                loading="lazy"
              />
              <div className="image-caption">
                The Malikha River — ancient trade route through northern Kachin State
              </div>
            </div>
          </div>

          {/* Interactive Influence Map Section */}
          <div className="crossroads-map-section">
            <div className="crossroads-header fade-in">
              <h2>Where Five Rivers Meet</h2>
              <span className="burmese-script">ငါးမြစ်ဆုံ</span>
              <p>Burma&apos;s cuisine flows from five tributaries, each carrying flavors from distant lands</p>
            </div>

            <div className="influence-arrows-container fade-in">
              {/* Center node - Burma */}
              <div className="influence-center">
                <span>BURMA</span>
                <span className="burmese-script">မြန်မာ</span>
              </div>

              {/* Influence nodes */}
              <div className="influence-node india fade-in">
                <h4>🇮🇳 India</h4>
                <p>Curry, biryani, naan</p>
              </div>
              <div className="influence-node china fade-in">
                <h4>🇨🇳 China</h4>
                <p>Wok, noodles, tofu</p>
              </div>
              <div className="influence-node thailand fade-in">
                <h4>🇹🇭 Thailand</h4>
                <p>Salads, herbs, curries</p>
              </div>
              <div className="influence-node mon fade-in">
                <h4>Mon</h4>
                <p>Fish, fermentation</p>
              </div>
              <div className="influence-node shan fade-in">
                <h4>Shan</h4>
                <p>Tofu, highland greens</p>
              </div>

              {/* Animated arrows */}
              <div className="influence-arrow india fade-in" />
              <div className="influence-arrow china fade-in" />
              <div className="influence-arrow thailand fade-in" />
              <div className="influence-arrow mon fade-in" />
              <div className="influence-arrow shan fade-in" />
            </div>
          </div>

          {/* Five Tributaries - Enhanced Cards with Images */}
          <div className="tributaries-grid">
            <div className="tributary-card fade-in">
              <img 
                className="tributary-card-image"
                src={foodImages.burmeseSamosa.url} 
                alt={foodImages.burmeseSamosa.alt}
                loading="lazy"
              />
              <div className="tributary-card-content">
                <h4><span className="tributary-flag">🇮🇳</span> From India</h4>
                <div className="arrow-transform">↓</div>
                <p className="burmese-dish">Samosa → Samusa</p>
                <span className="burmese-script">ဆမူဆာ</span>
                <p>Curry spices, biryani → dàn bauk, naan, dal traditions</p>
              </div>
            </div>

            <div className="tributary-card fade-in">
              <img 
                className="tributary-card-image"
                src={foodImages.shanNoodles.url} 
                alt={foodImages.shanNoodles.alt}
                loading="lazy"
              />
              <div className="tributary-card-content">
                <h4><span className="tributary-flag">🇨🇳</span> From China</h4>
                <div className="arrow-transform">↓</div>
                <p className="burmese-dish">Wok Mastery</p>
                <span className="burmese-script">ရှမ်းခေါက်ဆွဲ</span>
                <p>Noodles, stir-fry techniques, Yunnan fermentation wisdom</p>
              </div>
            </div>

            <div className="tributary-card fade-in">
              <img 
                className="tributary-card-image"
                src={foodImages.ohnNoKhaoSwe.url} 
                alt={foodImages.ohnNoKhaoSwe.alt}
                loading="lazy"
              />
              <div className="tributary-card-content">
                <h4><span className="tributary-flag">🇹🇭</span> From Thailand</h4>
                <div className="arrow-transform">↓</div>
                <p className="burmese-dish">Khao Soi → Ohn No</p>
                <span className="burmese-script">အုန်းနို့ခေါက်ဆွဲ</span>
                <p>Shared salad cultures, curry foundations, galangal and lemongrass</p>
              </div>
            </div>

            <div className="tributary-card fade-in">
              <img 
                className="tributary-card-image"
                src={foodImages.mohinga.url} 
                alt={foodImages.mohinga.alt}
                loading="lazy"
              />
              <div className="tributary-card-content">
                <h4>From Mon</h4>
                <div className="arrow-transform">↓</div>
                <p className="burmese-dish">Proto-Mohinga</p>
                <span className="burmese-script">မွန်</span>
                <p>Coastal cuisine, fermented fish expertise, the roots of Burma&apos;s national dish</p>
              </div>
            </div>

            <div className="tributary-card fade-in">
              <img 
                className="tributary-card-image"
                src={foodImages.shanTofu.url} 
                alt={foodImages.shanTofu.alt}
                loading="lazy"
              />
              <div className="tributary-card-content">
                <h4>From Shan</h4>
                <div className="arrow-transform">↓</div>
                <p className="burmese-dish">Tohu</p>
                <span className="burmese-script">ထိုးဟူး</span>
                <p>Chickpea tofu, sour rice dishes, highland vegetables</p>
              </div>
            </div>
          </div>

          {/* Ethnic Diversity Gallery */}
          <div className="diversity-gallery">
            <div className="diversity-header fade-in">
              <h3>The Many Faces of Myanmar&apos;s Kitchen</h3>
              <p>135 ethnic groups, each with their own culinary traditions, gather in Burma&apos;s markets</p>
            </div>

            <div className="diversity-strip">
              <div className="diversity-image-card fade-in">
                <img 
                  src={culturalImages.kachinWomen.url} 
                  alt={culturalImages.kachinWomen.alt}
                  loading="lazy"
                />
                <div className="diversity-image-caption">
                  <h4>Kachin Women</h4>
                  <p>Traditional dress of the northern highlands</p>
                </div>
              </div>

              <div className="diversity-image-card fade-in">
                <img 
                  src={culturalImages.paOhWomen.url} 
                  alt={culturalImages.paOhWomen.alt}
                  loading="lazy"
                />
                <div className="diversity-image-caption">
                  <h4>Pa-Oh Women</h4>
                  <p>Selling highland vegetables at the market</p>
                </div>
              </div>

              <div className="diversity-image-card fade-in">
                <img 
                  src={culturalImages.inleFloatingMarket.url} 
                  alt={culturalImages.inleFloatingMarket.alt}
                  loading="lazy"
                />
                <div className="diversity-image-caption">
                  <h4>Intha People</h4>
                  <p>Floating gardens on Inle Lake</p>
                </div>
              </div>

              <div className="diversity-image-card fade-in">
                <img 
                  src={culturalImages.chinStateRice.url} 
                  alt={culturalImages.chinStateRice.alt}
                  loading="lazy"
                />
                <div className="diversity-image-caption">
                  <h4>Chin State</h4>
                  <p>Highland rice cultivation in the western mountains</p>
                </div>
              </div>
            </div>
          </div>

          {/* Food Transformation Comparisons */}
          <div className="transformation-section">
            <div className="transformation-header fade-in">
              <h3>Transformation: How Burma Makes It Its Own</h3>
            </div>

            <div className="transformation-grid">
              {/* Samosa → Samusa */}
              <div className="transformation-pair fade-in">
                <div className="transformation-side origin">
                  <img 
                    src={foodImages.indianSamosa.url} 
                    alt={foodImages.indianSamosa.alt}
                    loading="lazy"
                  />
                  <div className="transformation-side-content">
                    <h4>Indian Samosa</h4>
                    <p>Deep-fried, potato-filled, served hot with chutney</p>
                  </div>
                </div>
                <div className="transformation-arrow">→</div>
                <div className="transformation-side result">
                  <img 
                    src={foodImages.burmeseSamosa.url} 
                    alt={foodImages.burmeseSamosa.alt}
                    loading="lazy"
                  />
                  <div className="transformation-side-content">
                    <h4>Burmese Samusa</h4>
                    <span className="burmese-script">ဆမူဆာ</span>
                    <p>Served in a salad, chopped with cabbage, chickpeas, lime, and tamarind</p>
                  </div>
                </div>
              </div>

              {/* Naan → Naan Bya */}
              <div className="transformation-pair fade-in">
                <div className="transformation-side origin">
                  <img 
                    src={foodImages.indianNaan.url} 
                    alt={foodImages.indianNaan.alt}
                    loading="lazy"
                  />
                  <div className="transformation-side-content">
                    <h4>Indian Naan</h4>
                    <p>Tandoor-baked, soft, served as side bread</p>
                  </div>
                </div>
                <div className="transformation-arrow">→</div>
                <div className="transformation-side result">
                  <img 
                    src={foodImages.naanByaMutton.url} 
                    alt={foodImages.naanByaMutton.alt}
                    loading="lazy"
                  />
                  <div className="transformation-side-content">
                    <h4>Naan Bya</h4>
                    <span className="burmese-script">နံပြား</span>
                    <p>Dipped in mutton soup — a complete breakfast meal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="chapter-content">
            <FigureProfile figure={getFigure('u-tin-maung')!} />

            <p className="fade-in">
              Consider <strong>ohn no khao swè</strong>{' '}
              <span className="burmese-script">(အုန်းနို့ခေါက်ဆွဲ)</span>, coconut chicken 
              noodle soup. At first glance, it resembles Thai khao soi or Malaysian laksa. 
              But taste it, and the differences emerge: the coconut milk is lighter, 
              the chickpea flour thickens the broth in a distinctly Burmese way, and the 
              accompaniments — crispy noodles, raw onion, lime, fish sauce — create a 
              flavor profile that belongs to no neighbor.
            </p>

            {/* Ohn No Khao Swè featured image */}
            <div className="full-bleed-image fade-in">
              <img 
                src={foodImages.ohnNoKhaoSwe.url} 
                alt={foodImages.ohnNoKhaoSwe.alt}
                loading="lazy"
              />
              <div className="image-caption">
                Ohn no khao swè — coconut chicken noodles, Burma&apos;s answer to the world&apos;s curried noodle soups
              </div>
            </div>
          </div>

          {/* Markets Gallery - The Crossroads in Action */}
          <div className="markets-gallery">
            <div className="markets-header fade-in">
              <h3>Where the Rivers Meet: Burma&apos;s Markets</h3>
              <p>Every morning, the crossroads comes alive</p>
            </div>

            <div className="markets-mosaic">
              <div className="market-tile featured fade-in">
                <img 
                  src={culturalImages.bogyokeMarket.url} 
                  alt={culturalImages.bogyokeMarket.alt}
                  loading="lazy"
                />
                <div className="market-tile-overlay">
                  <div>
                    <h4>Bogyoke Aung San Market</h4>
                    <p>Yangon&apos;s colonial-era market, where all Burma converges</p>
                  </div>
                </div>
              </div>

              <div className="market-tile fade-in">
                <img 
                  src={culturalImages.hsipawVegetableMarket.url} 
                  alt={culturalImages.hsipawVegetableMarket.alt}
                  loading="lazy"
                />
                <div className="market-tile-overlay">
                  <div>
                    <h4>Hsipaw Market</h4>
                    <p>Shan State riverside trading</p>
                  </div>
                </div>
              </div>

              <div className="market-tile fade-in">
                <img 
                  src={foodImages.tofuSaladPrep.url} 
                  alt={foodImages.tofuSaladPrep.alt}
                  loading="lazy"
                />
                <div className="market-tile-overlay">
                  <div>
                    <h4>Street Vendors</h4>
                    <p>Preparing Shan tofu salad</p>
                  </div>
                </div>
              </div>

              <div className="market-tile fade-in">
                <img 
                  src={foodImages.jaggery.url} 
                  alt={foodImages.jaggery.alt}
                  loading="lazy"
                />
                <div className="market-tile-overlay">
                  <div>
                    <h4>Jaggery</h4>
                    <p>Traditional palm sugar sweetener</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            CHAPTER 6: THE ROYAL TABLE
            ================================================================ */}
        <section className="chapter chapter-accent" id="chapter-6">
          <ChapterHeader chapter={chapters[5]} />
          
          <div className="chapter-content">
            <p className="fade-in stagger-1">
              {chapters[5].openingHook}
            </p>

            <div className="full-bleed-image fade-in stagger-2">
              <img 
                src={historicalImages.mandalayPalace.url} 
                alt={historicalImages.mandalayPalace.alt}
                loading="lazy"
              />
              <div className="image-caption">
                The Hluttaw (Supreme Council) at Mandalay Palace, 1886 — 
                one year after British annexation
              </div>
            </div>

            <p className="fade-in stagger-3">
              The Konbaung dynasty (1752-1885) represented the pinnacle of Burmese court 
              culture, and nowhere was this more evident than in the royal kitchens of 
              Mandalay. King Mindon, who founded the city in 1857, maintained a culinary 
              establishment that rivaled any in Asia: hundreds of cooks, specialized 
              departments for different dishes, and a daily menu that documented over 
              300 distinct preparations.
            </p>

            <div className="image-grid fade-in">
              <img 
                src={historicalImages.kingMindon.url} 
                alt={historicalImages.kingMindon.alt}
                loading="lazy"
              />
              <img 
                src={historicalImages.queenSupayalat.url} 
                alt={historicalImages.queenSupayalat.alt}
                loading="lazy"
              />
            </div>

            <FigureProfile figure={getFigure('king-mindon')!} />
            <FigureProfile figure={getFigure('queen-supayalat')!} />

            <p className="fade-in">
              When British forces exiled King Thibaw and Queen Supayalat in 1885, they 
              did more than end a dynasty — they severed the institutional memory of 
              Burmese high cuisine. The royal cooks scattered. The menus were lost or 
              burned. The elaborate preparations that had evolved over centuries suddenly 
              had no home, no patron, no future.
            </p>

            <div className="image-grid fade-in">
              <img 
                src={historicalImages.baganMural.url} 
                alt={historicalImages.baganMural.alt}
                loading="lazy"
              />
              <img 
                src={historicalImages.somingyiMural.url} 
                alt={historicalImages.somingyiMural.alt}
                loading="lazy"
              />
            </div>

            <FigureProfile figure={getFigure('chef-suu-kyi-win')!} />

            <p className="fade-in">
              Today, a new generation of Burmese chefs is attempting the painstaking work 
              of reconstruction. They piece together royal recipes from fragments: a British 
              officer&apos;s diary entry describing a banquet, a temple inscription listing 
              offerings, the oral memories of families who once served the palace. 
              Each recovered dish is an act of cultural archaeology.
            </p>
          </div>
        </section>

        {/* ================================================================
            CHAPTER 7: THE STREET PARLIAMENT
            ================================================================ */}
        <section className="chapter chapter-dark" id="chapter-7">
          <ChapterHeader chapter={chapters[6]} />
          
          <div className="chapter-content">
            <p className="fade-in stagger-1">
              {chapters[6].openingHook}
            </p>

            <div className="split-screen split-screen-reverse fade-in stagger-2">
              <div className="split-image">
                <img 
                  src={culturalImages.yangonTeahouse.url} 
                  alt={culturalImages.yangonTeahouse.alt}
                  loading="lazy"
                />
              </div>
              <div className="split-content">
                <p>
                  The Burmese tea shop is not merely a place to eat and drink — it is the 
                  nation&apos;s informal parliament, its neighborhood newsroom, its social safety valve. 
                  On low plastic stools around tiny tables, every stratum of society mingles: 
                  businessmen and rickshaw drivers, monks and merchants, students and soldiers.
                </p>
                <p>
                  The institution emerged during the colonial period, when Indian tea culture 
                  met Burmese social needs. The British brought the concept of the tea room, 
                  but Burmese entrepreneurs transformed it into something entirely local: 
                  louder, more democratic, open from dawn until midnight.
                </p>
              </div>
            </div>

            <p className="fade-in stagger-3">
              The menu is consistent across the country:{' '}
              <strong>laphet thoke</strong> is almost always available.{' '}
              <strong>Nan pya</strong> <span className="burmese-script">(နန်ပြား)</span>, 
              the Burmese flatbread, comes straight from the tandoor. Samosas arrived 
              with Indian immigrants and stayed forever.{' '}
              <strong>E kya kway</strong> <span className="burmese-script">(အီကြာကွေး)</span>, 
              Chinese-origin fried crullers, are dunked in sweet tea. And always, always, 
              the tea itself: sweet, milky, strong, served in small glasses that demand 
              frequent refills.
            </p>

            <div className="image-grid fade-in">
              <img 
                src={foodImages.teaHouseFood.url} 
                alt={foodImages.teaHouseFood.alt}
                loading="lazy"
              />
              <img 
                src={foodImages.mohingaAndLaphet.url} 
                alt={foodImages.mohingaAndLaphet.alt}
                loading="lazy"
              />
            </div>

            <FigureProfile figure={getFigure('ko-zaw-naing')!} />

            <p className="fade-in">
              Throughout Burma&apos;s turbulent political history, tea shops have served as 
              barometers of public sentiment. In times of repression, they become quieter, 
              conversations more guarded. During moments of opening, they explode with 
              debate. Regular customers know who is missing, who has fled, who has been 
              arrested — the tea shop keeps its own census of the nation&apos;s mood.
            </p>
          </div>
        </section>

        {/* ================================================================
            CHAPTER 8: THE SCATTERED TABLE
            ================================================================ */}
        <section className="chapter chapter-light" id="chapter-8">
          <ChapterHeader chapter={chapters[7]} />
          
          <div className="chapter-content">
            <p className="fade-in stagger-1">
              {chapters[7].openingHook}
            </p>

            <p className="fade-in stagger-2">
              The Burmese diaspora began in earnest after the 1962 military coup, 
              accelerated after the 1988 protests, and continues to this day. 
              Each wave of emigrants carried their cuisine with them — to Thailand, 
              to the United States, to the United Kingdom, to Australia. In refugee 
              camps on the Thai border, women learned to cook Burmese food with 
              Thai ingredients. In Oakland and Los Angeles, restaurants opened to 
              serve homesick communities and curious Americans alike.
            </p>

            {/* Narrative perspective - composite character representing diaspora restaurateurs */}
            <div className="diaspora-perspective fade-in">
              <p className="perspective-burmese burmese-script">
                ချက်ပြုတ်နည်းသုံးခုနဲ့ ခြောက်ငါးပိ တစ်အိတ်ယူလာခဲ့တယ်။ ကျန်တာအကုန် အရသာနဲ့ မှတ်မိရတယ်။
              </p>
              <p className="perspective-english">
                Many diaspora restaurateurs describe leaving Myanmar with just a few recipes 
                in their heads and a bag of dried ngapi. Everything else, they had to 
                remember by taste — reconstructing homeland flavors from memory alone.
              </p>
            </div>

            <p className="fade-in">
              Diaspora cuisine is cuisine under pressure. When ingredients are unavailable, 
              substitutions must be made — but what substitutions preserve authenticity, 
              and which ones cross an invisible line? Canned bamboo shoots stand in for 
              fresh banana stem. Fish sauce approximates ngapi when the real thing can&apos;t 
              be found. Each decision is a negotiation between memory and reality, 
              between homeland and new home.
            </p>

            <FigureProfile figure={getFigure('ma-aye-aye-win')!} />

            <p className="fade-in">
              And yet, remarkably, the cuisine persists. Young Burmese-Americans who have 
              never set foot in Myanmar learn to make mohinga from their grandmothers. 
              Food bloggers and Instagram accounts document recipes that might otherwise 
              fade from memory. In London, Melbourne, and Singapore, Burmese restaurants 
              serve as embassies of taste, introducing the cuisine to new audiences while 
              providing comfort to those who miss home.
            </p>

            <p className="fade-in">
              The scattered table is, perhaps, the ultimate testament to the resilience 
              of Burmese food culture. Empires have come and gone. Military governments 
              have risen and fallen. Borders have shifted and populations have moved. 
              But the flavors endure — in the fermentation jar, in the returning oil, 
              in the morning bowl of mohinga, in the shared platter of laphet thoke. 
              To eat Burmese food is to participate in a conversation that spans two 
              millennia and now circles the globe.
            </p>
          </div>
        </section>

        {/* Colonial Observer Figure */}
        <section className="chapter chapter-dark" id="colonial-perspective">
          <div className="chapter-content">
            <h3 className="fade-in">A Colonial Lens</h3>
            <p className="fade-in">
              Any complete history of Burmese cuisine must acknowledge the colonial 
              documentation that, for all its biases, preserved observations that might 
              otherwise be lost. George Orwell, who served as a colonial police officer 
              in Burma from 1922 to 1927, left scattered but revealing notes about 
              Burmese food culture in his novel <em>Burmese Days</em> and other writings.
            </p>
            <FigureProfile figure={getFigure('george-orwell')!} />
          </div>
        </section>

        {/* Sources */}
        <Sources />
      </div>
    </main>
  );
}
