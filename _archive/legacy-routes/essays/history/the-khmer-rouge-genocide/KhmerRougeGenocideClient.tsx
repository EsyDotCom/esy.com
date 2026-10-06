'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import './the-khmer-rouge-genocide.css';

// ============================================================================
// TYPES
// ============================================================================

interface Figure {
  name: string;
  epithet: string;
  contributions: string[];
  quote?: string;
  quoteSource?: string;
  fate?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageAttribution?: string;
}

interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle?: string;
  era: 'pre-war' | 'civil-war' | 'dk' | 'post-1979' | 'justice';
  metaphor: string;
  content: string[];
  figures?: Figure[];
  images?: {
    url: string;
    alt: string;
    caption?: string;
    attribution?: string;
  }[];
  statistics?: {
    label: string;
    value: string;
    source: string;
  }[];
}

interface Source {
  id: string;
  tier: 1 | 2 | 3;
  type: 'official' | 'academic' | 'journalism' | 'archive';
  title: string;
  author?: string;
  publisher?: string;
  year?: string;
  url?: string;
}

// ============================================================================
// CONTENT DATA
// ============================================================================

const CHAPTERS: Chapter[] = [
  {
    id: 'prologue',
    number: 0,
    title: 'The City Walked',
    subtitle: 'April 17, 1975',
    era: 'dk',
    metaphor: 'The day a city emptied itself at gunpoint',
    content: [
      'On April 17, 1975, Khmer Rouge forces entered Phnom Penh. The city\'s residents initially greeted them with relief—the five-year civil war was finally over. But within hours, soldiers began ordering the complete evacuation of the capital. Approximately 2 million people were forced onto roads leading out of the city with no warning, no preparation, and no return date. Loudspeakers announced that the Americans were about to bomb; residents were told they would return in three days. They never did.',
      'The evacuation was total and merciless. Hospitals were emptied at gunpoint. Patients on IV drips pushed their own gurneys down the streets. Women in labor walked alongside the elderly and infirm. Those who could not walk were left behind—or shot. Calmette Hospital, the largest in the city, was cleared of 2,000 patients. The Khmer Rouge offered no medical transport, no ambulances, no mercy. This was the first act of Year Zero: the city was a disease to be cured by erasure.',
      'The evacuation killed unknown thousands—estimates range from 10,000 to 20,000—through heat exhaustion, dehydration, and summary execution. April is the hottest month in Cambodia; temperatures exceeded 100°F. Families were separated in the chaos, never to reunite. The urban population—anyone educated, anyone who spoke French, anyone who wore glasses, anyone connected to the old regime simply by virtue of living in cities—was marked as ideologically corrupted. They became "New People" (ប្រជាជនថ្មី), a category that meant forced labor and probable death.',
      'The roads out of Phnom Penh became rivers of humanity flowing toward the countryside. Similar evacuations occurred simultaneously in every other city and town across Cambodia. Battambang, Siem Reap, Kampong Cham—all emptied. The Khmer Rouge believed that cities were parasites on the pure agrarian ideal, that urban dwellers were beyond redemption, that only by returning to the rice paddies could Cambodia achieve revolutionary purity.',
      'What followed would be three years, eight months, and twenty days of systematic destruction. Between April 17, 1975, and January 7, 1979, approximately 1.7 to 2 million people died—between 21% and 24% of Cambodia\'s total population by conservative estimates, or as high as 33% by others. They died from execution, starvation, disease, and overwork. The Khmer Rouge called their revolution "Year Zero"—a complete reset of Cambodian history, society, and identity. Everything before was to be erased; everyone connected to the past was suspect.'
    ],
    figures: [
      {
        name: 'Norodom Sihanouk',
        epithet: 'The King Who Allied with His Destroyers',
        contributions: [
          'Ruled as king and head of state (1941-1970)',
          'Deposed in 1970 coup by Lon Nol while abroad',
          'Formed alliance with Khmer Rouge against Lon Nol',
          'Became ceremonial head of state for Khmer Rouge (1975-1976)'
        ],
        quote: 'Yes, I had my part also in the mistake.',
        quoteSource: 'New York Review of Books, 1985',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/1972_Norodom_Sihanouk.jpg',
        imageAlt: 'Norodom Sihanouk in 1972',
        imageAttribution: 'Romanian National Archives, Public Domain'
      }
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Fall_of_Phnom_Penh.jpg',
        alt: 'Khmer Rouge forces entering Phnom Penh, April 17, 1975',
        caption: 'Khmer Rouge forces entering Phnom Penh on April 17, 1975—the beginning of Year Zero',
        attribution: 'Roland Neveu, CC BY-SA 3.0'
      }
    ],
    statistics: [
      { label: 'People evacuated', value: '~2 million', source: 'USHMM' },
      { label: 'Regime duration', value: '3 years, 8 months, 20 days', source: 'USHMM' },
      { label: 'Death toll', value: '1.7-2 million', source: 'Kiernan, ECCC' }
    ]
  },
  {
    id: 'before-year-zero',
    number: 1,
    title: 'Before Year Zero',
    subtitle: '1863-1969',
    era: 'pre-war',
    metaphor: 'The nation before its erasure',
    content: [
      'Cambodia\'s identity begins at Angkor. Between the 9th and 15th centuries, the Khmer Empire ruled over much of mainland Southeast Asia from its capital in what is now northwestern Cambodia. At its zenith under Jayavarman VII (r. 1181–1218), the empire stretched from modern-day Vietnam to Myanmar. Angkor Wat, built in the early 12th century, remains the largest religious monument in the world—a testament to Khmer engineering, artistry, and ambition. When the Khmer Rouge placed Angkor Wat on their flag, they were claiming this legacy. When they emptied the cities, they believed they were restoring Cambodia to its agrarian glory.',
      'The French arrived in 1863, establishing Cambodia as a protectorate within French Indochina. Colonial rule lasted ninety years. The French built roads, schools, and administrative systems—and extracted rubber, rice, and labor. A generation of Cambodian elites was educated in French; many studied in Paris. Among them were future Khmer Rouge leaders: Pol Pot, Khieu Samphan, Ieng Sary. They absorbed Marxist theory in Left Bank cafés, then returned home to implement it with lethal conviction.',
      'Independence came in 1953, wrested from France by Norodom Sihanouk through a combination of royal charisma and political maneuvering. Sihanouk abdicated the throne to become head of state, pursuing what he called "Buddhist socialism"—a mix of royal authority, state-led development, and studied neutrality. As the Vietnam War engulfed neighboring countries, Sihanouk walked a tightrope. He allowed North Vietnamese forces to use Cambodian territory for supply routes while publicly maintaining neutrality. It was an impossible balance.',
      'The Tonlé Sap—the Great Lake—embodied Cambodia\'s unique geography. Each monsoon season, the Mekong River reverses the Tonlé Sap\'s flow, expanding the lake fivefold and depositing nutrient-rich sediment across the floodplains. This annual cycle made Cambodia one of the most productive rice-growing regions on Earth. The Khmer Rouge believed this abundance could be multiplied through revolutionary discipline. Instead, their policies destroyed it.',
      'By 1970, Cambodia had universities, hospitals, a functioning civil service, a thriving capital, Buddhist monasteries with centuries of tradition, and a population that had known relative peace since independence. All of this would be systematically destroyed. Understanding what existed before Year Zero is essential to understanding what was lost—not just lives, but a society, a culture, a way of being in the world that the Khmer Rouge attempted to erase completely.'
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Angkor_Wat_at_sunrise_3.jpg',
        alt: 'Angkor Wat at sunrise',
        caption: 'Angkor Wat, the 12th-century temple complex that symbolizes Cambodian identity',
        attribution: 'Christophe95, CC BY-SA 4.0'
      }
    ]
  },
  {
    id: 'cold-war-spillover',
    number: 2,
    title: 'Cold War Spillover',
    subtitle: '1965-1973',
    era: 'civil-war',
    metaphor: 'Bombs as seeds of revolution',
    content: [
      'Between 1965 and 1973, the United States dropped 2.7 million tons of ordnance on Cambodia—more than the Allies dropped on Germany and Japan combined in World War II. The bombing came in two phases: the secret Operation Menu (1969–1970), authorized by President Nixon and National Security Advisor Henry Kissinger without Congressional knowledge, and the overt Operation Freedom Deal (1970–1973). Over 230,516 sorties struck 113,716 sites across the country. Entire villages were obliterated. The craters still scar the Cambodian landscape.',
      'The official justification was to destroy North Vietnamese Army bases and supply lines running through Cambodian territory—the "Ho Chi Minh Trail" network. Sihanouk had tolerated these incursions; Nixon chose to bomb them. The campaign was kept secret from Congress and the American public until 1973. When revealed, it contributed to the constitutional crisis that would end Nixon\'s presidency.',
      'What were the effects on Cambodia? The bombing killed an estimated 50,000 to 150,000 civilians—scholarly estimates vary widely because many areas were never surveyed. Hundreds of thousands of rural Cambodians fled to Phnom Penh and provincial capitals. The bombing destabilized Sihanouk\'s neutral government and contributed to the conditions that enabled Lon Nol\'s 1970 coup.',
      'Scholars fiercely debate the relationship between the bombing and Khmer Rouge growth. Ben Kiernan and Taylor Owen, analyzing declassified Air Force data, argue the bombing was "ichthyologically significant"—it drove traumatized, dispossessed peasants into the arms of the insurgents. Craig Etcheson acknowledges this but emphasizes that internal factors—Communist ideology, Khmer Rouge organization, Vietnamese support—were primary. Defenders of the policy, including Peter Rodman and Kissinger himself, argue the bombing targeted legitimate military objectives and that North Vietnamese occupation was the true destabilizer.',
      'This essay does not resolve that debate. What is certain: the bombs fell on neutral Cambodia; they killed Cambodian civilians; they displaced Cambodian families; they destabilized Cambodian society. Whether the bombing "caused" the Khmer Rouge is a question of causation. That it contributed to the conditions from which genocide emerged is beyond serious dispute.'
    ],
    statistics: [
      { label: 'Ordnance dropped', value: '2.7 million tons', source: 'Owen & Kiernan, 2006' },
      { label: 'Bombing sorties', value: '230,516', source: 'Declassified USAF data' },
      { label: 'Strike sites', value: '113,716', source: 'Owen & Kiernan analysis' }
    ],
    figures: [
      {
        name: 'Henry Kissinger',
        epithet: 'The Architect Abroad',
        contributions: [
          'US National Security Advisor (1969–1975)',
          'Ordered secret Cambodia bombing expansion (Operation Menu)',
          'Nobel Peace Prize recipient (1973)',
          'Controversial legacy regarding Cambodian civilian deaths',
          'Never faced tribunal for Cambodia policies'
        ],
        quote: 'We will not cooperate with any government investigation of Indochina.',
        quoteSource: 'Attributed, 1970s',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Henry_Kissinger.jpg',
        imageAlt: 'Henry Kissinger official portrait',
        imageAttribution: 'US State Department, Public Domain'
      }
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/2/27/An_air-to-air_left_underside_view_of_the_92nd_Bombardment_Wing%27s_new_camouflaged_B-52G_Stratofortress_aircraft_DF-ST-85-12450.jpg',
        alt: 'B-52 Stratofortress bomber in flight',
        caption: 'B-52 Stratofortress bombers dropped 2.7 million tons of ordnance on Cambodia between 1965-1973',
        attribution: 'USAF, Public Domain'
      }
    ]
  },
  {
    id: 'civil-war',
    number: 3,
    title: 'Civil War',
    subtitle: '1970-1975',
    era: 'civil-war',
    metaphor: 'The furnace that forged the revolution',
    content: [
      'On March 18, 1970, while Norodom Sihanouk was in Moscow, General Lon Nol and the National Assembly voted to depose him. The coup had American backing—the CIA had cultivated relationships with Lon Nol for years. Within days, Sihanouk was in Beijing, where he made a fateful announcement: he called on all Cambodians to join the resistance against the "traitors." That resistance was the Khmer Rouge.',
      'It was a devil\'s bargain. Sihanouk had spent years suppressing the Cambodian left; now he lent them his name and royal legitimacy. Thousands of peasants who revered the king joined the insurgency because Sihanouk asked them to. The Khmer Rouge, previously a marginal force, suddenly had mass appeal. They would reward Sihanouk\'s alliance by holding him under house arrest after taking power.',
      'The civil war that followed was catastrophic. Lon Nol\'s Khmer Republic, despite massive American military aid, proved incapable of holding territory. The army was corrupt, demoralized, and led by a man who had suffered a debilitating stroke in 1971 but refused to step aside. Meanwhile, the Khmer Rouge—disciplined, ideologically motivated, supported by North Vietnam—steadily conquered the countryside.',
      'An estimated 500,000 Cambodians died in the civil war itself—before the genocide began. Hundreds of thousands more fled to Phnom Penh and other cities. By April 1975, the capital held approximately 2 million people—a city built for 600,000 now swollen with refugees, cut off from the countryside, surviving on American airlifts of rice.',
      'The end came quickly. In early April, Lon Nol fled to Hawaii with American assistance. On April 17, 1975, Khmer Rouge forces entered Phnom Penh. Exhausted residents greeted them with white flags, hoping for peace. What they received was Year Zero.'
    ],
    figures: [
      {
        name: 'Lon Nol',
        epithet: 'The General Who Fell',
        contributions: [
          'Led March 1970 coup deposing Sihanouk',
          'Established Khmer Republic with US backing',
          'Suffered stroke (1971) but continued to lead',
          'Fled to Hawaii before Phnom Penh fell (April 1975)'
        ],
        fate: 'Died in exile, 1985',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/LonNol.jpg',
        imageAlt: 'Lon Nol',
        imageAttribution: 'Public Domain'
      }
    ]
  },
  {
    id: 'year-zero',
    number: 4,
    title: 'Year Zero',
    subtitle: 'April 1975 - December 1978',
    era: 'dk',
    metaphor: 'History restarted at gunpoint',
    content: [
      'The Khmer Rouge renamed Cambodia "Democratic Kampuchea" and declared 1975 to be Year Zero—a complete erasure of Cambodian history, society, and identity. Everything that came before was corrupt; everyone connected to the past was suspect. This was not reform. This was civilizational reset at gunpoint.',
      'The policies were radical beyond anything seen since Mao\'s Cultural Revolution—and in some ways more extreme. All money was abolished overnight; the Khmer Rouge burned currency and blew up the National Bank. Markets ceased to exist. Private property was eliminated. Religion was banned; Buddhist monks were defrocked, forced to marry, or killed. Pagodas became storage facilities or execution sites. The 2,000-year tradition of Cambodian Buddhism was to be erased.',
      'The population was divided into categories that determined survival. "Base People" (មូលដ្ឋាន)—poor peasants who had lived in Khmer Rouge zones during the civil war—were considered ideologically pure. "New People" (ប្រជាជនថ្មី)—urban evacuees, former government employees, teachers, doctors, merchants, anyone educated—were corrupted beyond redemption. This distinction was often a death sentence.',
      'The entire country was reorganized into agricultural cooperatives. Families were separated. Collective dining replaced family meals—a deliberate policy to destroy the family unit as a site of loyalty outside Angkar. Children were encouraged to report their parents. Marriage required party approval. Personal relationships were suspect.',
      'The party called itself "Angkar Padevat" (អង្គការបដិវត្តន៍)—"The Revolutionary Organization"—but typically just "Angkar." Its identity was kept secret; Pol Pot\'s leadership was not publicly acknowledged until 1977. Angkar saw everything, knew everything, controlled everything. Its slogans became mantras of terror: "Angkar has the eyes of a pineapple." And most chillingly: "To keep you is no benefit, to destroy you is no loss."'
    ],
    figures: [
      {
        name: 'Pol Pot (Saloth Sar)',
        epithet: 'Brother Number One',
        contributions: [
          'Born 1925 to prosperous farming family',
          'Studied in Paris; joined French Communist Party',
          'Led Khmer Rouge from 1963',
          'Supreme leader of Democratic Kampuchea (1975-1979)'
        ],
        quote: 'I came to carry out the struggle, not to kill people.',
        quoteSource: 'Nate Thayer interview, 1997',
        fate: 'Died under house arrest (1998) before facing tribunal',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/38/PolPot.jpg',
        imageAlt: 'Pol Pot',
        imageAttribution: 'Public Domain'
      }
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Democratic_Kampuchea.svg',
        alt: 'Flag of Democratic Kampuchea',
        caption: 'The flag of Democratic Kampuchea (1975-1979), featuring Angkor Wat in yellow on red',
        attribution: 'Public Domain'
      }
    ]
  },
  {
    id: 'starvation',
    number: 5,
    title: 'Starvation as Policy',
    subtitle: '1976-1978',
    era: 'dk',
    metaphor: 'The regime that governed through hunger',
    content: [
      'The death toll of Democratic Kampuchea breaks down into three categories, each representing systematic policy failure and deliberate violence. Execution: approximately 500,000 to 1 million—shot, bludgeoned, or beheaded at killing sites across the country. Starvation: approximately 500,000 to 1 million—worked to death on inadequate rations while the regime exported rice. Disease and overwork: approximately 500,000—malaria, dysentery, and cholera in a country where medicine was banned as bourgeois.',
      'The Khmer Rouge believed Cambodia could be transformed into an agrarian utopia through revolutionary will. They set impossible agricultural quotas—three tons of rice per hectare when traditional farming yielded one. When cooperatives failed to meet these quotas, the failure was interpreted as sabotage, evidence of "hidden enemies" within. The punishment was death. So cadres lied about production, reported false numbers, and watched their people starve.',
      'Meanwhile, the regime exported rice to China in exchange for military equipment. Ships left Cambodian ports loaded with grain while children in the cooperatives ate tree bark, insects, and rice husks. Ration systems allocated thin rice gruel twice daily—roughly 250 grams of rice per person. Workers labored 12-16 hours daily in the fields. The human body cannot survive on such inadequate nutrition while performing heavy agricultural labor.',
      'Western medicine was banned as a symbol of foreign corruption. The regime promoted "traditional remedies"—herbal treatments that were useless against malaria, dysentery, and the epidemics sweeping through malnourished populations. Hospitals were closed or converted to other uses. Trained doctors were killed as intellectuals. When people fell ill, they were often seen as shirking their revolutionary duties.',
      'This was not famine caused by natural disaster or war. This was policy-driven starvation—an economic system that prioritized revolutionary ideology over human survival. The Khmer Rouge governed through hunger, using food as a weapon of control. Those who resisted, those who were suspected of resistance, those who simply couldn\'t work hard enough—they starved first.'
    ],
    figures: [
      {
        name: 'Khieu Samphan',
        epithet: 'The Economist of Revolution',
        contributions: [
          'Head of State of Democratic Kampuchea',
          'Doctorate in economics from Paris',
          'Presented regime as agrarian reform',
          'Convicted of genocide (ethnic Vietnamese) and crimes against humanity (2018)'
        ],
        fate: 'Life sentence; still serving',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Case_002_Initial_Hearing_Khieu_Samphan_%282%29.jpg',
        imageAlt: 'Khieu Samphan at ECCC tribunal',
        imageAttribution: 'ECCC, CC BY 2.0'
      }
    ],
    statistics: [
      { label: 'Deaths by execution', value: '500,000-1 million', source: 'Scholarly estimates' },
      { label: 'Deaths by starvation', value: '500,000-1 million', source: 'Scholarly estimates' },
      { label: 'Deaths by disease/overwork', value: '~500,000', source: 'Scholarly estimates' }
    ]
  },
  {
    id: 's21',
    number: 6,
    title: 'S-21: Bureaucracy of Terror',
    subtitle: '1976-1979',
    era: 'dk',
    metaphor: 'A school turned slaughterhouse',
    content: [
      'Tuol Sleng was once Chao Ponhea Yat High School, a secondary school in a quiet Phnom Penh neighborhood. Under the Khmer Rouge, it became S-21—Security Prison 21—the regime\'s primary interrogation and extermination center. Between 14,000 and 17,000 people passed through its gates between 1976 and 1979. Approximately 12 are known to have survived. The survival rate was less than 0.1%.',
      'The facility was run by Duch (Kaing Guek Eav), a former mathematics teacher who brought bureaucratic precision to mass murder. Every prisoner was photographed upon intake—men, women, children, the elderly—creating an archive of approximately 6,000 photographs that now form the core of the Tuol Sleng Genocide Museum. These images show faces frozen in terror, confusion, defiance. Each represents a human being who entered S-21 and did not leave.',
      'The purpose of S-21 was to extract confessions. Under torture—waterboarding, electric shock, pulling out fingernails, hanging from gallows with arms twisted behind the back—prisoners "confessed" to elaborate conspiracies involving the CIA, the KGB, the Vietnamese. The confessions were absurd, logically impossible, internally contradictory. They were also meticulously documented. Duch reviewed each confession personally, annotating them with corrections and demands for more detail.',
      'Once they had confessed, prisoners were transported to Choeung Ek—the "Killing Fields"—a former Chinese cemetery 15 kilometers south of Phnom Penh. There, they were killed by blows to the head with farming implements—hoes, wooden clubs, palm fronds sharpened to a point. Bullets were too expensive. The bodies were dumped into mass graves. Over 8,000 bodies have been exhumed from Choeung Ek alone; many more remain.',
      'S-21 was not unique—it was the most documented of 189-196 interrogation centers operating across Democratic Kampuchea. Similar facilities existed in every zone. But S-21\'s meticulous records—intake photographs, torture notes, execution logs, confessions—would later provide crucial evidence for the ECCC. The bureaucracy of terror kept its own record of atrocity. The filing cabinets testified when the perpetrators would not.'
    ],
    figures: [
      {
        name: 'Duch (Kaing Guek Eav)',
        epithet: 'The Schoolteacher Who Ran S-21',
        contributions: [
          'Former mathematics teacher',
          'Commander of S-21 (1975-1979)',
          'Oversaw detention and execution of ~14,000-17,000 people',
          'Converted to Christianity before trial'
        ],
        quote: 'I am morally and legally responsible for the crimes committed at S-21.',
        quoteSource: 'ECCC testimony, 2009',
        fate: 'Life sentence (Case 001); died 2020',
        imageAlt: 'Duch at ECCC tribunal',
        imageAttribution: 'ECCC, CC BY 2.0'
      }
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Facade_of_Tuol_Sleng_Genocide_Museum_-_Phnom_Penh_-_Cambodia_%2848322340337%29.jpg',
        alt: 'Facade of Tuol Sleng Genocide Museum',
        caption: 'The former high school that became S-21, now the Tuol Sleng Genocide Museum',
        attribution: 'Adam Jones, CC BY-SA 2.0'
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Buddhist_Stupa_at_Choeung_Ek_killing_fields%2C_Cambodia.JPG',
        alt: 'Choeung Ek Memorial Stupa',
        caption: 'The memorial stupa at Choeung Ek, containing remains of victims',
        attribution: 'Timgray200, CC BY-SA 3.0'
      }
    ],
    statistics: [
      { label: 'S-21 detainees', value: '14,000-17,000', source: 'USHMM, ECCC' },
      { label: 'Known survivors', value: '~12', source: 'USHMM' },
      { label: 'Interrogation centers', value: '189-196', source: 'USHMM' }
    ]
  },
  {
    id: 'genocide-definition',
    number: 7,
    title: 'What Is Genocide?',
    subtitle: 'Legal Framework',
    era: 'justice',
    metaphor: 'The word that names the crime',
    content: [
      'The word "genocide" was invented in 1944 by Raphael Lemkin, a Polish-Jewish lawyer who had lost 49 family members in the Holocaust. He combined the Greek "genos" (race, tribe) with the Latin "cide" (killing) to name a crime that had no name. The 1948 UN Convention on the Prevention and Punishment of the Crime of Genocide—drafted in response to the Holocaust—defines genocide as acts "committed with intent to destroy, in whole or in part, a national, ethnical, racial or religious group."',
      'This definition is precise and demanding. The key requirement is specific intent—what lawyers call "dolus specialis"—to destroy a protected group as such. Mass killing alone is not genocide; it must target a group because of its national, ethnic, racial, or religious identity. This distinction matters legally, even when it feels morally inadequate.',
      'Did the Khmer Rouge commit genocide? The ECCC\'s answer was both yes and no. In Case 002/02, the tribunal convicted Nuon Chea of genocide against two groups: ethnic Vietnamese and Cham Muslims. Khieu Samphan was convicted of genocide against ethnic Vietnamese. The evidence was overwhelming: systematic identification and extermination of Vietnamese residents; forced assimilation, dispersal, and mass killing of Cham communities; explicit party directives calling for the elimination of these groups.',
      'But the vast majority of Khmer Rouge victims were ethnic Khmer—killed not as Khmer but as "enemies" of the revolution. Urban dwellers, intellectuals, former government officials, suspected dissidents—these were targeted not as a protected group but as political enemies. Under international law, this is "crimes against humanity," not genocide. The distinction may seem semantic; legally, it is crucial.',
      'The ECCC\'s verdicts thus established that the Khmer Rouge committed both genocide (against specific ethnic and religious minorities) and crimes against humanity (against the broader Cambodian population). Understanding this distinction is essential: it does not diminish the suffering of any victim. It names, precisely, the different forms of systematic violence the regime employed.'
    ],
    figures: [
      {
        name: 'Nuon Chea',
        epithet: 'Brother Number Two',
        contributions: [
          'Deputy Secretary of Communist Party of Kampuchea',
          'Chief ideologist of the Khmer Rouge',
          'Convicted of genocide (ethnic Vietnamese and Cham) and crimes against humanity (2018)'
        ],
        quote: 'I accept moral responsibility for the suffering of the Cambodian people.',
        quoteSource: 'ECCC proceedings',
        fate: 'Life sentence; died 2019',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Nuon_Chea_on_31_October_2013.jpg',
        imageAlt: 'Nuon Chea at ECCC tribunal, October 2013',
        imageAttribution: 'ECCC, CC BY 2.0'
      }
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/7/71/29_August_2011_Courtroom_%281%29.jpg',
        alt: 'ECCC courtroom during proceedings',
        caption: 'The Extraordinary Chambers in the Courts of Cambodia delivered genocide convictions in Cases 002/01 and 002/02',
        attribution: 'ECCC, CC BY 2.0'
      }
    ]
  },
  {
    id: 'world-outside',
    number: 8,
    title: 'The World Outside',
    subtitle: '1975-1979',
    era: 'dk',
    metaphor: 'The silence that shielded slaughter',
    content: [
      'A common defense of international inaction is that "the world didn\'t know." This is false. Evidence of mass atrocities emerged almost immediately. Refugees fleeing to Thailand in 1975 described the evacuations, the executions, the starvation. By 1976, detailed accounts had reached Western governments and media. The question was never knowledge—it was action.',
      'Some journalists managed to pierce Democratic Kampuchea\'s isolation. In December 1978, Elizabeth Becker and Richard Dudman became two of the only Western journalists to visit during the regime. Becker\'s colleague Malcolm Caldwell—a Marxist academic sympathetic to the Khmer Rouge—was murdered during that visit, likely by regime elements. Becker\'s subsequent book, "When the War Was Over," remains essential reading. Her audio recordings of interviews with Pol Pot were later used as evidence at the ECCC.',
      'Why did the world not act? Cold War calculations trumped humanitarian concerns. After Vietnam\'s 1978 invasion of Cambodia, the United States, China, and their allies faced a choice: condemn the Khmer Rouge genocide or oppose Vietnamese expansion. They chose the latter. The Khmer Rouge retained Cambodia\'s UN seat until 1982—three years after their overthrow. The coalition government that replaced them at the UN included Khmer Rouge representatives until 1993.',
      'The United States continued to provide indirect support to Khmer Rouge remnants fighting the Vietnamese-backed government. China was their primary patron. Thailand allowed them sanctuary along the border. The same international community that would eventually fund the ECCC had earlier funded, armed, and diplomatically recognized the perpetrators.',
      'This is not ancient history. It is a reminder that genocide prevention requires political will, not just information. The evidence was available. The photographs existed. The refugees testified. The international community—democratic and authoritarian alike—chose geopolitical expedience over human lives.'
    ],
    figures: [
      {
        name: 'Elizabeth Becker',
        epithet: 'The Witness',
        contributions: [
          'American journalist',
          'One of only two Western journalists to interview Pol Pot while in power (December 1978)',
          'Author of When the War Was Over',
          'Her audio recordings used as ECCC evidence'
        ],
        imageAlt: 'Elizabeth Becker'
      }
    ]
  },
  {
    id: 'after-1979',
    number: 9,
    title: 'After 1979',
    subtitle: 'January 1979 - 1990s',
    era: 'post-1979',
    metaphor: 'When liberation brings new suffering',
    content: [
      'On December 25, 1978—Christmas Day—Vietnam launched a full-scale invasion of Democratic Kampuchea. By January 7, 1979, Vietnamese forces had captured Phnom Penh. The Khmer Rouge regime collapsed in two weeks; its leaders fled westward toward the Thai border. For the surviving population, liberation had arrived—but at what cost, and from whom?',
      'The Vietnamese discovery of S-21 and the killing fields provided the first systematic documentation of Khmer Rouge atrocities. Journalists accompanying Vietnamese forces photographed Tuol Sleng\'s torture chambers, its walls still covered in blood. The People\'s Republic of Kampuchea, established under Vietnamese occupation, preserved these sites as memorials. But the new government was itself a Vietnamese creation, led by former Khmer Rouge cadres who had defected—including Hun Sen.',
      'What followed was not peace. Vietnamese occupation lasted a decade (1979–1989), resisted by a coalition that included Khmer Rouge remnants, royalists, and non-communist nationalists—all supported by China, the United States, and Thailand. Over 300,000 Cambodians fled to refugee camps along the Thai border, where they lived in squalid conditions controlled by various factions. The Khmer Rouge established camps there too, rebuilding their forces.',
      'Cambodia became one of the most landmine-contaminated countries on Earth. Millions of mines were laid during the civil war, the DK period, the Vietnamese occupation, and the subsequent resistance. They continue to kill and maim Cambodians today—a legacy of violence that outlasts the perpetrators.',
      'The Paris Peace Accords of 1991 finally ended the conflict, bringing UN peacekeepers (UNTAC) and elections in 1993. But the accords granted amnesty to all factions, including Khmer Rouge leaders. Pol Pot, Nuon Chea, Khieu Samphan, and Ieng Sary remained free. It would take another decade—and the deaths of several key perpetrators—before any faced justice.'
    ],
    figures: [
      {
        name: 'Hun Sen',
        epithet: 'The Survivor Who Ruled',
        contributions: [
          'Former Khmer Rouge cadre who defected (1977)',
          'Prime Minister of Cambodia (1985–2023)',
          'Oversaw ECCC establishment with international community',
          'Criticized for limiting tribunal scope to senior leaders',
          'Complex legacy: stability, authoritarianism, compromised justice'
        ],
        quote: 'We cannot allow the Khmer Rouge leaders to die peacefully without facing justice.',
        quoteSource: 'Statement on ECCC, 2000s',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Hun_Sen_%282016%29_cropped.jpg',
        imageAlt: 'Hun Sen official portrait',
        imageAttribution: 'Government of Cambodia, CC BY 2.0'
      }
    ],
  },
  {
    id: 'justice-memory',
    number: 10,
    title: 'Justice & Memory',
    subtitle: '1997-2022',
    era: 'justice',
    metaphor: 'The trial that tried to heal a nation',
    content: [
      'The path to justice took decades. Pol Pot died under house arrest in 1998, never facing trial. Ta Mok, "the Butcher," died in custody in 2006. Ieng Sary died during trial in 2013. Ieng Thirith, his wife and former Social Affairs Minister, was declared unfit to stand trial due to dementia. Death and infirmity claimed most perpetrators before any court could.',
      'The Extraordinary Chambers in the Courts of Cambodia (ECCC) was a hybrid tribunal—Cambodian and international judges, Cambodian and international prosecutors, Cambodian and international law. It was established in 2006 after years of negotiation between the Cambodian government and the United Nations. The government insisted on limiting the tribunal\'s scope to "senior leaders and those most responsible"—a restriction that excluded thousands of lower-level perpetrators, including village-level cadres who carried out executions.',
      'Case 001 tried Duch, the former commander of S-21. He was convicted in 2010 and sentenced to 35 years, later increased to life imprisonment on appeal. Duch was the only defendant to fully acknowledge his crimes and express remorse. He died in 2020.',
      'Case 002 tried the surviving senior leaders: Nuon Chea and Khieu Samphan. The case was so complex it was split into two trials. Case 002/01 (2014) convicted them of crimes against humanity for the forced evacuation and specific execution sites. Case 002/02 (2018) convicted them of genocide against ethnic Vietnamese and Cham Muslims, additional crimes against humanity, and grave breaches of the Geneva Conventions. Both received life sentences. Nuon Chea died in 2019.',
      'Three convictions after 16 years and $337 million. Critics ask: Was this justice? Supporters respond: It created an irrefutable historical record. The ECCC entered residual functions in 2022. Meanwhile, the Documentation Center of Cambodia (DC-Cam) has trained over 5,000 teachers and reached 7 million young Cambodians with genocide education. If law failed to deliver justice, perhaps education can deliver memory.'
    ],
    statistics: [
      { label: 'ECCC convictions', value: '3', source: 'ECCC, UN News' },
      { label: 'ECCC cost', value: '$337 million', source: 'ECCC' },
      { label: 'ECCC duration', value: '16 years', source: 'ECCC' },
      { label: 'Teachers trained (DC-Cam)', value: '5,000+', source: 'DC-Cam' },
      { label: 'Young Cambodians reached', value: '7 million+', source: 'DC-Cam' }
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/7/71/29_August_2011_Courtroom_%281%29.jpg',
        alt: 'ECCC Trial Chamber during proceedings',
        caption: 'The ECCC Trial Chamber—only 3 convictions after 16 years and $337 million',
        attribution: 'ECCC, CC BY 2.0'
      }
    ]
  },
  {
    id: 'education-gap',
    number: 11,
    title: 'The Education Gap',
    subtitle: 'Global Context',
    era: 'justice',
    metaphor: 'The genocide that isn\'t taught',
    content: [
      'In Western secondary schools, genocide education overwhelmingly focuses on the Holocaust—as it should. But Cambodia, where one-quarter of the population died in less than four years, receives minimal coverage. Most Western students graduate without learning that it happened. Why?',
      'Several factors explain the gap. Geographic and cultural distance: Cambodia is far from Europe and North America, and Southeast Asian history rarely enters Western curricula. Cold War complicity: the United States bombed Cambodia and later supported Khmer Rouge remnants—an inconvenient history for American classrooms. Timing: the genocide occurred as the Vietnam War ended, and Americans preferred to forget Indochina entirely. Language: survivor testimony was not widely translated into English until the 2000s.',
      'There is also an implicit hierarchy of suffering. Holocaust education serves multiple purposes in Western curricula: it teaches universal lessons about prejudice and genocide while specifically commemorating Jewish victims. Cambodia fits less neatly into these frameworks. The victims were mostly ethnic Khmer killed by ethnic Khmer—complicating the narrative of ethnic persecution. The perpetrators were Communists—but so were their Vietnamese liberators, confusing Cold War moral frameworks.',
      'Cambodia, however, has built its own education. In 2009, the Cambodian government mandated genocide education in grades 9-12. DC-Cam produced textbooks, trained over 5,000 teachers, and developed curriculum materials used by millions of students. Memorial sites—Tuol Sleng, Choeung Ek, 81 smaller memorials across the country—serve as both archives and classrooms. The generation born after 1979 is learning what their parents often could not speak about.',
      'This chapter does not claim equivalence between genocides—each has its own history, its own victims, its own meaning. It asks instead why global memory is selective. Why do some atrocities become universal lessons while others remain regional tragedies? The answer lies not in the nature of the crimes but in the politics of memory.'
    ]
  },
  {
    id: 'epilogue',
    number: 12,
    title: 'What Survives',
    subtitle: 'Present Day',
    era: 'justice',
    metaphor: 'Memory as resistance to erasure',
    content: [
      'The Khmer Rouge called their revolution "Year Zero"—a complete erasure of everything that came before. They attempted to destroy Cambodian history, culture, religion, family, and identity itself. They failed. Cambodians survived. Cambodia survived. And memory, despite everything, survived.',
      'Today, 81 genocide memorials stand across Cambodia—from the towering stupa at Choeung Ek, which contains the remains of over 8,000 victims visible through glass panels, to small village memorials marking local execution sites. Tuol Sleng Genocide Museum receives approximately 300,000 visitors annually, including tens of thousands of Cambodian students. The faces photographed at intake—frozen forever in their final days—now bear witness for eternity.',
      'Cambodian artists, writers, and filmmakers continue to process the trauma. Rithy Panh, a survivor who lost most of his family, has made it his life\'s work to document the genocide—his film "The Missing Picture" was nominated for an Academy Award. The painter Vann Nath, one of the few S-21 survivors, spent his remaining years painting his memories before his death in 2011. Loung Ung\'s memoir "First They Killed My Father" became a major film. Each work is an act of remembrance.',
      'The generation born after 1979 now vastly outnumbers survivors. For them, the genocide is inherited memory—stories from parents and grandparents, lessons in schools, visits to memorial sites. Whether this inheritance becomes living memory or recedes into history depends on the choices Cambodia and the world make now. DC-Cam\'s slogan captures the challenge: "Searching for the Truth."',
      'Year Zero attempted to restart history. But history cannot be restarted. It can only be remembered, documented, taught, and passed on. Memory is the resistance that outlasts power. The Khmer Rouge are gone. The dead remain. And we are here to remember them.'
    ],
    figures: [
      {
        name: 'Youk Chhang',
        epithet: 'The Documentarian',
        contributions: [
          'Executive Director, Documentation Center of Cambodia (DC-Cam)',
          'Survivor of Democratic Kampuchea',
          'Built archive of 1.7+ million document pages',
          'Trained 5,000+ teachers in genocide education'
        ],
        quote: 'Without memory, there is no justice.',
        imageAlt: 'Youk Chhang'
      }
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Buddhist_Stupa_at_Choeung_Ek_killing_fields%2C_Cambodia.JPG',
        alt: 'Choeung Ek Memorial Stupa',
        caption: 'The memorial stupa at Choeung Ek contains the remains of victims—a memorial and a warning',
        attribution: 'Timgray200, CC BY-SA 3.0'
      }
    ]
  }
];

const SOURCES: Source[] = [
  { id: 'eccc-001', tier: 1, type: 'official', title: 'Case 001 Appeal Judgment', publisher: 'ECCC', year: '2012', url: 'https://eccc.gov.kh' },
  { id: 'eccc-002', tier: 1, type: 'official', title: 'Case 002/02 Trial Judgment', publisher: 'ECCC', year: '2018', url: 'https://eccc.gov.kh' },
  { id: 'un-genocide', tier: 1, type: 'official', title: 'Convention on the Prevention and Punishment of the Crime of Genocide', publisher: 'United Nations', year: '1948', url: 'https://www.un.org/en/genocideprevention/genocide-convention.shtml' },
  { id: 'ushmm', tier: 1, type: 'official', title: 'Cambodia: 1975-1979', publisher: 'US Holocaust Memorial Museum', url: 'https://www.ushmm.org/genocide-prevention/countries/cambodia' },
  { id: 'dccam', tier: 1, type: 'archive', title: 'Documentation Center of Cambodia Archives', publisher: 'DC-Cam', url: 'https://dccam.org' },
  { id: 'kiernan', tier: 2, type: 'academic', title: 'The Pol Pot Regime: Race, Power, and Genocide in Cambodia', author: 'Ben Kiernan', publisher: 'Yale University Press', year: '2008' },
  { id: 'chandler-brother', tier: 2, type: 'academic', title: 'Brother Number One: A Political Biography of Pol Pot', author: 'David P. Chandler', publisher: 'Westview Press', year: '1999' },
  { id: 'chandler-s21', tier: 2, type: 'academic', title: 'Voices from S-21: Terror and History in Pol Pot\'s Secret Prison', author: 'David P. Chandler', publisher: 'UC Press', year: '2000' },
  { id: 'becker', tier: 2, type: 'journalism', title: 'When the War Was Over', author: 'Elizabeth Becker', publisher: 'PublicAffairs', year: '1998' },
  { id: 'hinton-why', tier: 2, type: 'academic', title: 'Why Did They Kill? Cambodia in the Shadow of Genocide', author: 'Alexander Laban Hinton', publisher: 'UC Press', year: '2005' },
  { id: 'etcheson', tier: 2, type: 'academic', title: 'After the Killing Fields: Lessons from the Cambodian Genocide', author: 'Craig Etcheson', publisher: 'Praeger', year: '2005' },
  { id: 'owen-kiernan', tier: 2, type: 'academic', title: 'Bombs Over Cambodia', author: 'Taylor Owen & Ben Kiernan', publisher: 'The Walrus', year: '2006' }
];

const GLOSSARY: { term: string; khmer?: string; definition: string }[] = [
  { term: 'Angkar', khmer: 'អង្គការ', definition: '"The Organization"—Khmer Rouge term for the party' },
  { term: 'Angkor Wat', definition: '12th-century temple complex; symbol of Cambodian cultural identity' },
  { term: 'Base People', khmer: 'មូលដ្ឋាន', definition: 'Rural peasants considered ideologically pure by the Khmer Rouge' },
  { term: 'Brother Number One', definition: 'Title for Pol Pot, supreme leader of the Khmer Rouge' },
  { term: 'Brother Number Two', definition: 'Title for Nuon Chea, chief ideologist' },
  { term: 'Buddhist socialism', definition: 'Sihanouk\'s political philosophy combining Buddhism with socialist economics' },
  { term: 'Cham', definition: 'Muslim ethnic minority in Cambodia; targeted for genocide by Khmer Rouge' },
  { term: 'Choeung Ek', definition: 'Primary execution site near Phnom Penh; "Killing Fields"' },
  { term: 'Collectivization', definition: 'Forced communal farming and dining under Khmer Rouge' },
  { term: 'CPK', definition: 'Communist Party of Kampuchea' },
  { term: 'Crimes against humanity', definition: 'Widespread systematic attacks on civilian populations' },
  { term: 'DC-Cam', definition: 'Documentation Center of Cambodia—archive and education center' },
  { term: 'Democratic Kampuchea', definition: 'Official name of Khmer Rouge state (1975-1979)' },
  { term: 'Dolus specialis', definition: '"Special intent"—legal requirement for genocide conviction' },
  { term: 'Duch', definition: 'Kaing Guek Eav, commander of S-21; convicted in Case 001' },
  { term: 'ECCC', definition: 'Extraordinary Chambers in the Courts of Cambodia (Khmer Rouge tribunal)' },
  { term: 'Ethnic Vietnamese', definition: 'Vietnamese minority in Cambodia; targeted for genocide' },
  { term: 'Force Publique', definition: 'Khmer Rouge enforcement units' },
  { term: 'French Indochina', definition: 'French colonial territory including Cambodia (1863-1953)' },
  { term: 'Genocide', definition: 'Acts committed with intent to destroy a national, ethnic, racial, or religious group' },
  { term: 'Genocide Convention', definition: '1948 UN treaty defining genocide' },
  { term: 'Hun Sen', definition: 'Former Khmer Rouge cadre; Prime Minister of Cambodia (1985-2023)' },
  { term: 'Ieng Sary', definition: 'Deputy Prime Minister of Democratic Kampuchea; died before trial' },
  { term: 'Khieu Samphan', definition: 'Head of State of Democratic Kampuchea; convicted of genocide' },
  { term: 'Khmer Republic', definition: 'Lon Nol\'s US-backed government (1970-1975)' },
  { term: 'Khmer Rouge', khmer: 'ខ្មែរក្រហម', definition: '"Red Khmer"—French term for Cambodian communists' },
  { term: 'Killing Fields', definition: 'Sites of mass execution under Khmer Rouge' },
  { term: 'Lon Nol', definition: 'General who led 1970 coup; led Khmer Republic until 1975' },
  { term: 'Mekong River', definition: 'Major river flowing through Cambodia' },
  { term: 'New People', khmer: 'ប្រជាជនថ្មី', definition: 'Urban evacuees considered ideologically corrupted' },
  { term: 'Norodom Sihanouk', definition: 'King and head of state; allied with Khmer Rouge after 1970 coup' },
  { term: 'Nuon Chea', definition: 'Brother Number Two; convicted of genocide; died 2019' },
  { term: 'Operation Freedom Deal', definition: 'US bombing campaign over Cambodia (1970-1973)' },
  { term: 'Operation Menu', definition: 'Secret US bombing campaign (1969-1970)' },
  { term: 'Paris Peace Accords', definition: '1991 agreement ending Cambodian conflict' },
  { term: 'People\'s Republic of Kampuchea', definition: 'Vietnamese-backed state (1979-1989)' },
  { term: 'Phnom Penh', definition: 'Capital of Cambodia; forcibly evacuated April 17, 1975' },
  { term: 'Pol Pot', definition: 'Saloth Sar; Khmer Rouge leader (Brother Number One); died 1998' },
  { term: 'Protected groups', definition: 'National, ethnic, racial, or religious groups protected under Genocide Convention' },
  { term: 'Quota system', definition: 'Impossible agricultural targets enforced through violence' },
  { term: 'Re-education', definition: 'Forced labor and indoctrination under Khmer Rouge' },
  { term: 'S-21', definition: 'Security Prison 21 (Tuol Sleng); ~14,000-17,000 detained; ~12 survived' },
  { term: 'Santebal', khmer: 'សន្តិបាល', definition: 'Khmer Rouge secret police' },
  { term: 'Stupa', definition: 'Buddhist memorial structure; Choeung Ek stupa contains victims\' remains' },
  { term: 'Tonlé Sap', definition: 'Great Lake of Cambodia; unique reversing flow ecosystem' },
  { term: 'Tuol Sleng', definition: 'Former high school converted to S-21 prison; now Genocide Museum' },
  { term: 'UNTAC', definition: 'UN Transitional Authority in Cambodia (1992-1993)' },
  { term: 'Year Zero', khmer: 'ឆ្នាំសូន្យ', definition: 'Khmer Rouge concept of complete historical reset' },
  { term: 'Youk Chhang', definition: 'Executive Director of DC-Cam; survivor and genocide educator' },
  { term: 'Zone', definition: 'Administrative division under Khmer Rouge; six zones with separate leadership' }
];

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function ProgressBar({
  chapters,
  currentChapter,
  progress
}: {
  chapters: Chapter[];
  currentChapter: number;
  progress: number;
}) {
  return (
    <nav className="progress-bar" aria-label="Reading progress">
      <div className="progress-bar__stupa">
        <svg viewBox="0 0 40 200" className="progress-bar__svg">
          {/* Stupa outline */}
          <path
            d="M20 10 L25 30 L30 50 L32 80 L35 120 L38 160 L40 200 L0 200 L2 160 L5 120 L8 80 L10 50 L15 30 Z"
            className="progress-bar__outline"
          />
          {/* Fill based on progress */}
          <clipPath id="progress-clip">
            <rect x="0" y={200 - (progress * 200)} width="40" height={progress * 200} />
          </clipPath>
          <path
            d="M20 10 L25 30 L30 50 L32 80 L35 120 L38 160 L40 200 L0 200 L2 160 L5 120 L8 80 L10 50 L15 30 Z"
            className="progress-bar__fill"
            clipPath="url(#progress-clip)"
          />
        </svg>
        {/* Chapter markers */}
        <div className="progress-bar__markers">
          {chapters.map((chapter, i) => (
            <div
              key={chapter.id}
              className={`progress-bar__marker ${i <= currentChapter ? 'progress-bar__marker--active' : ''}`}
              style={{ top: `${(i / (chapters.length - 1)) * 100}%` }}
              title={chapter.title}
            />
          ))}
        </div>
      </div>
      <div className="progress-bar__label">
        {chapters[currentChapter]?.title || 'Year Zero, Visualized'}
      </div>
    </nav>
  );
}

function Hero({ onBegin }: { onBegin: () => void }) {
  return (
    <header className="hero">
      <div className="hero__background">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Buddhist_Stupa_at_Choeung_Ek_killing_fields%2C_Cambodia.JPG"
          alt="Choeung Ek Memorial Stupa"
          className="hero__image"
        />
        <div className="hero__overlay" />
      </div>
      <div className="hero__content">
        <h1 className="hero__title">Year Zero, Visualized</h1>
        <p className="hero__subtitle">
          Cambodia&apos;s Civil War and the Khmer Rouge Genocide, 1960s–1990s
        </p>
        <p className="hero__stat">
          Approximately 1.7–2 million people died under the Khmer Rouge—
          <br />
          25-33% of Cambodia&apos;s population—in just three years, eight months, and twenty days.
        </p>
        <button className="hero__cta" onClick={onBegin}>
          Begin Reading <span aria-hidden="true">↓</span>
        </button>
      </div>
    </header>
  );
}

function FigureCard({ figure }: { figure: Figure }) {
  return (
    <aside className="figure-card">
      {figure.imageUrl && (
        <div className="figure-card__image-container">
          <img
            src={figure.imageUrl}
            alt={figure.imageAlt || figure.name}
            className="figure-card__image"
          />
          {figure.imageAttribution && (
            <span className="figure-card__attribution">{figure.imageAttribution}</span>
          )}
        </div>
      )}
      <div className="figure-card__content">
        <h4 className="figure-card__name">{figure.name}</h4>
        <p className="figure-card__epithet">{figure.epithet}</p>
        <ul className="figure-card__contributions">
          {figure.contributions.map((contribution, i) => (
            <li key={i}>{contribution}</li>
          ))}
        </ul>
        {figure.quote && (
          <blockquote className="figure-card__quote">
            &ldquo;{figure.quote}&rdquo;
            {figure.quoteSource && (
              <cite className="figure-card__quote-source">— {figure.quoteSource}</cite>
            )}
          </blockquote>
        )}
        {figure.fate && (
          <p className="figure-card__fate">{figure.fate}</p>
        )}
      </div>
    </aside>
  );
}

function StatisticCard({ stat }: { stat: { label: string; value: string; source: string } }) {
  return (
    <div className="statistic-card">
      <div className="statistic-card__value">{stat.value}</div>
      <div className="statistic-card__label">{stat.label}</div>
      <div className="statistic-card__source">Source: {stat.source}</div>
    </div>
  );
}

const ECCC_VERDICTS = [
  {
    caseNumber: 'Case 001',
    defendant: 'Duch (Kaing Guek Eav)',
    charges: 'Crimes against humanity, grave breaches of Geneva Conventions',
    verdict: 'Guilty',
    sentence: 'Life imprisonment',
    year: '2010 (appeal 2012)',
    status: 'Died 2020'
  },
  {
    caseNumber: 'Case 002/01',
    defendant: 'Nuon Chea, Khieu Samphan',
    charges: 'Crimes against humanity (forced evacuation, execution)',
    verdict: 'Guilty',
    sentence: 'Life imprisonment',
    year: '2014 (appeal 2016)',
    status: 'Nuon Chea died 2019; Khieu Samphan serving'
  },
  {
    caseNumber: 'Case 002/02',
    defendant: 'Nuon Chea, Khieu Samphan',
    charges: 'Genocide (Vietnamese, Cham), crimes against humanity',
    verdict: 'Guilty',
    sentence: 'Life imprisonment affirmed',
    year: '2018 (appeal 2022)',
    status: 'Final judgment'
  }
];

function ECCCVerdictTable() {
  return (
    <div className="verdict-table-container">
      <h3 className="verdict-table__title">ECCC Case Outcomes</h3>
      <table className="verdict-table">
        <thead>
          <tr>
            <th>Case</th>
            <th>Defendant(s)</th>
            <th>Charges</th>
            <th>Verdict</th>
            <th>Sentence</th>
          </tr>
        </thead>
        <tbody>
          {ECCC_VERDICTS.map((v) => (
            <tr key={v.caseNumber}>
              <td className="verdict-table__case">{v.caseNumber}</td>
              <td>{v.defendant}</td>
              <td>{v.charges}</td>
              <td className="verdict-table__verdict">{v.verdict}</td>
              <td>{v.sentence}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="verdict-table__note">
        Only 3 convictions after 16 years and $337 million. Many perpetrators—including Pol Pot (1998),
        Ieng Sary (2013), and Ta Mok (2006)—died before facing trial.
      </p>
    </div>
  );
}

function ChapterSection({ chapter, isActive }: { chapter: Chapter; isActive: boolean }) {
  return (
    <section
      id={chapter.id}
      className={`chapter chapter--${chapter.era} ${isActive ? 'chapter--active' : ''}`}
      data-chapter={chapter.number}
    >
      <div className="chapter__header">
        <span className="chapter__number">Chapter {chapter.number}</span>
        <h2 className="chapter__title">{chapter.title}</h2>
        {chapter.subtitle && (
          <p className="chapter__subtitle">{chapter.subtitle}</p>
        )}
        <p className="chapter__metaphor">{chapter.metaphor}</p>
      </div>

      <div className="chapter__body">
        {/* Main content */}
        <div className="chapter__content">
          {chapter.content.map((paragraph, i) => (
            <p key={i} className="chapter__paragraph">{paragraph}</p>
          ))}
        </div>

        {/* Statistics */}
        {chapter.statistics && chapter.statistics.length > 0 && (
          <div className="chapter__statistics">
            {chapter.statistics.map((stat, i) => (
              <StatisticCard key={i} stat={stat} />
            ))}
          </div>
        )}

        {/* ECCC Verdict Table - only for justice-memory chapter */}
        {chapter.id === 'justice-memory' && <ECCCVerdictTable />}

        {/* Images */}
        {chapter.images && chapter.images.length > 0 && (
          <div className="chapter__images">
            {chapter.images.map((image, i) => (
              <figure key={i} className="chapter__figure">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="chapter__image"
                  loading="lazy"
                />
                {image.caption && (
                  <figcaption className="chapter__caption">
                    {image.caption}
                    {image.attribution && (
                      <span className="chapter__attribution"> — {image.attribution}</span>
                    )}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        {/* Figures */}
        {chapter.figures && chapter.figures.length > 0 && (
          <div className="chapter__figures">
            {chapter.figures.map((figure, i) => (
              <FigureCard key={i} figure={figure} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SourcesSection({ sources }: { sources: Source[] }) {
  const tier1 = sources.filter(s => s.tier === 1);
  const tier2 = sources.filter(s => s.tier === 2);

  return (
    <section className="sources-section">
      <h2 className="sources-section__title">Sources</h2>

      <div className="sources-section__tier">
        <h3 className="sources-section__tier-title">Primary Sources</h3>
        <ul className="sources-section__list">
          {tier1.map(source => (
            <li key={source.id} className="sources-section__item">
              {source.author && <span className="sources-section__author">{source.author}. </span>}
              <cite className="sources-section__title-text">{source.title}</cite>
              {source.publisher && <span>. {source.publisher}</span>}
              {source.year && <span>, {source.year}</span>}
              {source.url && (
                <a href={source.url} className="sources-section__link" target="_blank" rel="noopener noreferrer">
                  [Link]
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="sources-section__tier">
        <h3 className="sources-section__tier-title">Academic Sources</h3>
        <ul className="sources-section__list">
          {tier2.map(source => (
            <li key={source.id} className="sources-section__item">
              {source.author && <span className="sources-section__author">{source.author}. </span>}
              <cite className="sources-section__title-text">{source.title}</cite>
              {source.publisher && <span>. {source.publisher}</span>}
              {source.year && <span>, {source.year}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GlossarySection({ glossary }: { glossary: typeof GLOSSARY }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="glossary-section">
      <button
        className="glossary-section__toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h2 className="glossary-section__title">Glossary ({glossary.length} terms)</h2>
        <span className="glossary-section__icon" aria-hidden="true">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <dl className="glossary-section__list">
          {glossary.map(item => (
            <div key={item.term} className="glossary-section__item">
              <dt className="glossary-section__term">
                {item.term}
                {item.khmer && <span className="glossary-section__khmer"> ({item.khmer})</span>}
              </dt>
              <dd className="glossary-section__definition">{item.definition}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function KhmerRougeGenocideClient() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mainRef = useRef<HTMLElement>(null);

  // Handle scroll progress
  const handleScroll = useCallback(() => {
    if (!mainRef.current) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollTop / docHeight, 1);
    setScrollProgress(progress);

    // Determine current chapter
    const chapterElements = mainRef.current.querySelectorAll('.chapter');
    chapterElements.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
        setCurrentChapter(i);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleBegin = () => {
    setHasStarted(true);
    // Scroll to first chapter
    const firstChapter = document.getElementById('prologue');
    if (firstChapter) {
      firstChapter.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <div className={`essay essay--khmer-rouge ${prefersReducedMotion ? 'essay--reduced-motion' : ''}`}>
      {/* Progress bar */}
      {hasStarted && (
        <ProgressBar
          chapters={CHAPTERS}
          currentChapter={currentChapter}
          progress={scrollProgress}
        />
      )}

      {/* Hero */}
      {!hasStarted && <Hero onBegin={handleBegin} />}

      {/* Main content */}
      <main ref={mainRef} className="essay__main">
        {CHAPTERS.map((chapter, i) => (
          <ChapterSection
            key={chapter.id}
            chapter={chapter}
            isActive={i === currentChapter}
          />
        ))}

        {/* Glossary */}
        <GlossarySection glossary={GLOSSARY} />

        {/* Sources */}
        <SourcesSection sources={SOURCES} />
      </main>

      {/* Footer */}
      <footer className="essay__footer">
        <p className="essay__footer-text">
          This essay was created with care for survivors, victims, and their descendants.
          Memory is resistance to erasure.
        </p>
        <p className="essay__footer-attribution">
          All images sourced from Wikimedia Commons and public archives under Creative Commons
          or Public Domain licenses. Full attribution in Sources section.
        </p>
      </footer>
    </div>
  );
}
