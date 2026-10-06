'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import './cambodia-bombing.css';

// ============================================================================
// TYPES
// ============================================================================

interface Figure {
  name: string;
  role: string;
  contributions: string[];
  quote?: string;
  quoteSource?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageAttribution?: string;
}

interface Statistic {
  value: string;
  label: string;
  source: string;
}

interface ImageAsset {
  url: string;
  alt: string;
  caption?: string;
  attribution?: string;
}

interface ComparisonSlider {
  beforeLabel: string;
  afterLabel: string;
  beforeValue: string;
  afterValue: string;
  caption: string;
  source: string;
}

interface Chapter {
  id: string;
  number: number;
  title: string;
  temporal: string;
  era: 'war' | 'postwar' | 'contemporary';
  metaphor: string;
  content: string[];
  figures?: Figure[];
  statistics?: Statistic[];
  images?: ImageAsset[];
  hasScrollLock?: boolean;
  scrollLockType?: 'ball-game' | 'anything-flies' | 'furnace' | 'unfinished';
  hasOperationMenu?: boolean;
  comparisonSlider?: ComparisonSlider;
}

interface GlossaryTerm {
  term: string;
  definition: string;
}

interface Source {
  type: 'primary' | 'academic' | 'data' | 'contemporary';
  citation: string;
  url?: string;
}

interface MenuOperation {
  name: string;
  code: string;
  baseArea: string;
  dateRange: string;
  sorties: number;
  tonnage: number;
}

// ============================================================================
// OPERATION MENU DATA
// ============================================================================

const OPERATION_MENU_DATA: MenuOperation[] = [
  { name: 'Breakfast', code: 'BREAKFAST', baseArea: '353 (Fishhook)', dateRange: 'Mar 18 - Apr 1969', sorties: 728, tonnage: 20_292 },
  { name: 'Lunch', code: 'LUNCH', baseArea: '609', dateRange: 'Apr - May 1969', sorties: 489, tonnage: 13_608 },
  { name: 'Snack', code: 'SNACK', baseArea: '351', dateRange: 'Apr - May 1969', sorties: 226, tonnage: 6_292 },
  { name: 'Dinner', code: 'DINNER', baseArea: '352', dateRange: 'May - Jun 1969', sorties: 384, tonnage: 10_691 },
  { name: 'Supper', code: 'SUPPER', baseArea: '740', dateRange: 'Jun - Jul 1969', sorties: 651, tonnage: 18_127 },
  { name: 'Dessert', code: 'DESSERT', baseArea: '350', dateRange: 'Jul 1969 - May 1970', sorties: 1_397, tonnage: 38_903 },
];

const MENU_TOTALS = {
  sorties: 3_875,
  tonnage: 108_823,
  duration: '14 months',
  source: 'USAF Historical Records (Declassified)',
};

// ============================================================================
// CLASSIFICATION STATUS
// ============================================================================

type ClassificationStatus = 'CLASSIFIED' | 'LEAKED' | 'DENIED' | 'DEBATED' | 'DECLASSIFIED' | 'STILL UNFINISHED';

function getClassificationStatus(progress: number): ClassificationStatus {
  if (progress < 15) return 'CLASSIFIED';
  if (progress < 30) return 'LEAKED';
  if (progress < 45) return 'DENIED';
  if (progress < 65) return 'DEBATED';
  if (progress < 85) return 'DECLASSIFIED';
  return 'STILL UNFINISHED';
}

// ============================================================================
// CONTENT DATA
// ============================================================================

const CHAPTERS: Chapter[] = [
  {
    id: 'before-storm',
    number: 1,
    title: 'Before the Storm',
    temporal: '1965-1968 — The Johnson Years',
    era: 'war',
    metaphor: 'The gathering clouds — covert operations that laid groundwork for what followed.',
    content: [
      'Cambodia, officially neutral under Prince Norodom Sihanouk, found itself caught between superpowers. While maintaining public neutrality, Sihanouk tacitly permitted Vietnamese communist sanctuaries along the eastern border and allowed the Sihanouk Trail—a supply route that moved an estimated 21,000 tons of material through the port of Sihanoukville.',
      'The United States began probing Cambodia\'s borders as early as 1965. Project Daniel Boone (later Salem House) sent covert reconnaissance teams across the border beginning in May 1967. Between 1965 and 1968, U.S. aircraft flew 2,565 sorties into Cambodian airspace, dropping 214 tons of ordnance—small-scale tactical strikes that foreshadowed what would come.',
      'Military planners fixated on COSVN—the Central Office for South Vietnam—believing it to be a hidden Pentagon from which the Vietnamese communists directed the war. In reality, COSVN was a dispersed network of mobile command posts, not a fixed target. This phantom would justify years of bombing.',
    ],
    figures: [
      {
        name: 'Norodom Sihanouk',
        role: 'Prince and Head of State (until March 1970)',
        contributions: [
          'Maintained Cambodia\'s official neutrality during the Vietnam War',
          'Tacitly permitted Vietnamese communist sanctuaries in border regions',
          'Enabled Sihanouk Trail supply route through Cambodian territory',
          'Overthrown by Lon Nol coup in March 1970',
          'Later allied with Khmer Rouge from exile in Beijing',
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Norodom_Sihanouk_%281941%29.jpg',
        imageAlt: 'Prince Norodom Sihanouk in 1941',
        imageAttribution: 'Public Domain',
      },
    ],
    statistics: [
      { value: '2,565', label: 'Sorties (1965-68)', source: 'USAF Historical Records' },
      { value: '214', label: 'Tons dropped', source: 'Kiernan & Owen, 2015' },
      { value: '21,000', label: 'Tons through Sihanoukville', source: 'NSC estimates' },
    ],
    images: [
      {
        url: 'https://tile.loc.gov/image-services/iiif/service:gmd:gmd8:g8010:g8010:ct002807/full/pct:25/0/default.jpg',
        alt: 'CIA map of Cambodia-Vietnam border, 1970',
        caption: 'CIA map showing the Cambodian-Vietnamese border region and infiltration routes (1970)',
        attribution: 'Library of Congress, Public Domain',
      },
    ],
  },
  {
    id: 'operation-breakfast',
    number: 2,
    title: 'Operation Breakfast',
    temporal: 'March 18, 1969 — The Secret Begins',
    era: 'war',
    metaphor: 'The first lie — a bombing campaign born in deception, named for a meal.',
    content: [
      'On February 9, 1969, General Creighton Abrams sent a cable to Washington proposing B-52 strikes on suspected COSVN headquarters in Base Area 353—the "Fishhook" region of Cambodia. The proposal reached the new president within days.',
      'Nixon authorized the strike on March 15, 1969, at 3:35 PM. He demanded absolute secrecy. Henry Kissinger and Colonel Alexander Haig met with Colonel Ray Sitton—the JCS B-52 expert known as "Mr. B-52"—to design a dual reporting system that would hide the bombing from Congress, the press, and even the Secretary of State.',
      'On March 18, between 48 and 60 B-52 Stratofortress bombers struck Base Area 353. The official records showed the bombs fell in South Vietnam. The real coordinates were transmitted through back channels, then destroyed. This was Operation Breakfast—the first course in what would become Operation Menu.',
      'Military assessments found "The City"—a logistics complex containing 182 bunkers and 1,282 weapons. But COSVN headquarters was never destroyed. The phantom proved to be just that.',
    ],
    figures: [
      {
        name: 'Richard Nixon',
        role: '37th President of the United States',
        contributions: [
          'Authorized Operation Menu (March 1969)',
          'Demanded absolute secrecy to avoid Congressional reaction',
          'Announced Cambodia "incursion" on April 30, 1970',
          'Escalated bombing under Operation Freedom Deal',
        ],
        quote: 'If the world\'s most powerful nation acts like a pitiful helpless giant, the forces of totalitarianism and anarchy will threaten free nations throughout the world.',
        quoteSource: 'Cambodia Incursion Address, April 30, 1970',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Richard_Nixon_presidential_portrait.jpg',
        imageAlt: 'Richard Nixon presidential portrait',
        imageAttribution: 'Public Domain, White House',
      },
      {
        name: 'Henry Kissinger',
        role: 'National Security Adviser (1969-1975)',
        contributions: [
          'Designed dual reporting system with Colonel Sitton',
          'Personally selected bombing targets',
          'Ordered FBI wiretaps after Beecher leak',
          'Issued "anything that flies on anything that moves" order',
        ],
        quote: 'Anything that flies on anything that moves.',
        quoteSource: 'Phone conversation with Alexander Haig, December 9, 1970',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Henry_Kissinger.jpg',
        imageAlt: 'Henry Kissinger official portrait',
        imageAttribution: 'U.S. State Department, Public Domain',
      },
      {
        name: 'General Creighton Abrams',
        role: 'MACV Commander',
        contributions: [
          'Proposed B-52 strikes on COSVN (February 1969)',
          'Claimed targeted areas were "underpopulated"',
          'Later testified about "special furnace" for record destruction',
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/GEN_Creighton_W._Abrams.jpg',
        imageAlt: 'General Creighton Abrams',
        imageAttribution: 'U.S. Army, Public Domain',
      },
      {
        name: 'General Earle Wheeler',
        role: 'Chairman, Joint Chiefs of Staff',
        contributions: [
          'First proposed bombing Cambodian sanctuaries (January 30, 1969)',
          'One of few with full knowledge of dual reporting system',
          'Coordinated military targeting with White House',
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Earle_Wheeler_official_photo.JPEG',
        imageAlt: 'General Earle Wheeler',
        imageAttribution: 'U.S. Army, Public Domain',
      },
      {
        name: 'Melvin Laird',
        role: 'Secretary of Defense (1969-1973)',
        contributions: [
          'Opposed secrecy (not the bombing itself)',
          'Warned Nixon that secrecy was unsustainable',
          'Advocated for congressional notification',
        ],
        quote: 'I was all for hitting those targets in Cambodia, but I wanted it public.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Melvin_Laird_official_photo.JPEG',
        imageAlt: 'Melvin Laird',
        imageAttribution: 'U.S. Department of Defense, Public Domain',
      },
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/B-52D_dropping_bombs_over_Vietnam.jpg',
        alt: 'B-52D Stratofortress dropping bombs over Vietnam',
        caption: 'B-52D Stratofortress releasing bombs during an Arc Light mission over Southeast Asia',
        attribution: 'U.S. Air Force, Public Domain',
      },
    ],
    hasScrollLock: true,
    scrollLockType: 'ball-game',
  },
  {
    id: 'the-menu',
    number: 3,
    title: 'The Menu',
    temporal: 'March 1969 - May 1970 — 14 Months of Secret War',
    era: 'war',
    metaphor: 'War reduced to code names for breakfast, lunch, dinner, dessert.',
    content: [
      'Over fourteen months, Operation Menu expanded through six phases—each named for a meal. Breakfast targeted Base Area 353. Lunch struck Base Area 609. Snack hit Base Area 351. Dinner targeted Base Area 352. Supper struck Base Area 740. Dessert bombed Base Area 350.',
      'In total: 3,875 sorties. 108,823 tons of bombs. All officially recorded as having fallen in South Vietnam.',
      'The dual reporting system operated with bureaucratic precision. Colonel Sitton would bring target lists to the White House, where Kissinger marked targets personally. Real coordinates went through back channels to Saigon. Radar operators at Bien Hoa received secret instructions, then burned all records. The mission completion code: "The ball game is over."',
      'Major Hal Knight supervised those radar crews. He was ordered to destroy every piece of paper after each strike. The moral weight of this system would eventually break him.',
    ],
    figures: [
      {
        name: 'Colonel Ray Sitton',
        role: '"Mr. B-52" — JCS Expert',
        contributions: [
          'Designed dual reporting system with Haig',
          'Brought target lists to White House for Kissinger',
          'Backchanneled actual coordinates to field commanders',
          'Promoted to Lieutenant General for his role',
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Sitton_rb.jpg',
        imageAlt: 'Lieutenant General Ray B. Sitton',
        imageAttribution: 'U.S. Air Force, Public Domain',
      },
      {
        name: 'Major Hal Knight',
        role: 'USAF Whistleblower',
        contributions: [
          'Supervised radar crews at Bien Hoa',
          'Received secret coordinates; ordered to burn all records',
          'Delivered code "The ball game is over" after strikes',
          'Resigned from Air Force over moral concerns',
          'Wrote to Senator Proxmire (December 1972)',
          'Testified before Senate Armed Services Committee (July 16, 1973)',
        ],
        quote: 'It is my firm conviction that the American people, through their elected representatives, have the right to know how the war has been conducted.',
        quoteSource: 'Senate Testimony, July 16, 1973',
      },
      {
        name: 'Colonel Alexander Haig',
        role: 'Kissinger\'s Military Aide',
        contributions: [
          'Key architect of dual reporting system',
          'Met with Sitton in February 1969 to design secrecy scheme',
          'Laughed on phone when Kissinger relayed "anything that moves" order',
          'Later became White House Chief of Staff, Secretary of State',
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/General_Alexander_Meigs_Haig%2C_Jr.jpg',
        imageAlt: 'Alexander Haig',
        imageAttribution: 'White House, Public Domain',
      },
    ],
    statistics: [
      { value: '3,875', label: 'Sorties', source: 'USAF Records' },
      { value: '108,823', label: 'Tons', source: 'Declassified data' },
      { value: '14', label: 'Months of secrecy', source: 'Congressional Record' },
    ],
    hasOperationMenu: true,
  },
  {
    id: 'the-leak',
    number: 4,
    title: 'The Leak',
    temporal: 'May 9, 1969 — The Story Breaks',
    era: 'war',
    metaphor: 'The crack in the wall — a single article that should have ended everything.',
    content: [
      'On May 9, 1969, William Beecher of the New York Times published an article headlined "Raids in Cambodia by U.S. Unprotested." The story ran on the front page, lower right. It should have been a scandal. Instead, it barely registered.',
      'Kissinger\'s reaction was fury. He called FBI Director J. Edgar Hoover: "We will destroy whoever did this." Within days, the FBI began wiretapping seventeen government officials and journalists—searching for the source of the leak.',
      'Morton Halperin, an NSC staffer and Beecher\'s college roommate, was the prime suspect. His phone was tapped for twenty-one months. The wiretaps found nothing about Cambodia but captured private conversations—fuel for later lawsuits against Kissinger.',
      'Why didn\'t the story catch fire? The Pentagon\'s assessment: "Little adverse public reaction noted." Cambodia was officially neutral. The bombing was denied. The American public, already exhausted by Vietnam, didn\'t connect the dots. The secret held.',
    ],
    figures: [
      {
        name: 'William Beecher',
        role: 'New York Times Military Correspondent',
        contributions: [
          'Broke story of secret bombing (May 9, 1969)',
          'Article headline: "Raids in Cambodia by U.S. Unprotested"',
          'Triggered Kissinger\'s wiretap program',
        ],
      },
      {
        name: 'Morton Halperin',
        role: 'NSC Staffer',
        contributions: [
          'Prime suspect as Beecher\'s source (was his college roommate)',
          'Phone tapped for 21 months',
          'Later sued Kissinger over illegal surveillance',
        ],
      },
      {
        name: 'J. Edgar Hoover',
        role: 'FBI Director',
        contributions: [
          'Received Kissinger\'s call demanding investigation',
          'Authorized wiretaps on 17 officials and journalists',
          'FBI surveillance found no Cambodia leak evidence',
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Hoover-JEdgar-LOC.jpg',
        imageAlt: 'J. Edgar Hoover portrait',
        imageAttribution: 'Library of Congress, Public Domain',
      },
    ],
  },
  {
    id: 'freedom-deal',
    number: 5,
    title: 'Freedom Deal',
    temporal: 'May 1970 - August 1973 — The War Expands',
    era: 'war',
    metaphor: 'The floodgates open — from secret sorties to carpet bombing half a nation.',
    content: [
      'On March 18, 1970, while Sihanouk was abroad, General Lon Nol seized power in a coup. The delicate fiction of Cambodian neutrality collapsed. Six weeks later, Nixon went on television.',
      '"This is not an invasion of Cambodia," the President declared on April 30, 1970. U.S. ground forces crossed the border. Four students died at Kent State protesting the incursion. The bombing, no longer secret, now expanded.',
      'Operation Freedom Deal replaced Operation Menu. The targeting zone grew from a 48-kilometer band along the border to half the country. In the final year alone, the U.S. dropped approximately 250,000 tons—half the campaign\'s total.',
      'On December 9, 1970, Kissinger issued an order captured in a phone transcript with Alexander Haig: "Anything that flies on anything that moves." Haig laughed. The order became policy.',
    ],
    figures: [
      {
        name: 'Lon Nol',
        role: 'General, later President (1970-1975)',
        contributions: [
          'Led coup against Sihanouk (March 18, 1970)',
          'Established Khmer Republic with U.S. backing',
          'Received U.S. air support against Khmer Rouge',
          'Fled Cambodia April 1, 1975',
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/70/LonNol_%28cropped%29.jpg',
        imageAlt: 'Lon Nol',
        imageAttribution: 'Public Domain',
      },
      {
        name: 'The Kent State Four',
        role: 'Students killed May 4, 1970',
        contributions: [
          'Allison Krause (19) — placed flower in Guard rifle barrel day before',
          'Jeffrey Miller (20) — subject of Pulitzer-winning photograph',
          'Sandra Lee Scheuer (20) — walking to class, not protesting',
          'William Schroeder (19) — ROTC student, walking between classes',
        ],
        quote: '"What if you knew her and found her dead on the ground?" — Crosby, Stills, Nash & Young, "Ohio"',
      },
    ],
    statistics: [
      { value: '~250,000', label: 'Tons (1973 alone)', source: 'USAF Historical Records' },
      { value: '4', label: 'Kent State dead', source: 'Historical Record' },
      { value: '100,000+', label: 'Sorties (1970-73)', source: 'Owen & Kiernan' },
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Perspective_of_Ohio_National_Guard_at_Kent_State.JPG',
        alt: 'Ohio National Guard at Kent State University, May 4, 1970',
        caption: 'Ohio National Guard on campus at Kent State University during protests against the Cambodia incursion, May 4, 1970',
        attribution: 'Public Domain',
      },
    ],
    hasScrollLock: true,
    scrollLockType: 'anything-flies',
  },
  {
    id: 'the-furnace',
    number: 6,
    title: 'The Furnace',
    temporal: '1973 — Revelation and Resistance',
    era: 'war',
    metaphor: 'The fire that failed — documents burned, but truth survived.',
    content: [
      'In December 1972, Major Hal Knight wrote to Senator William Proxmire. He had carried the secret for three years. Now he told everything: the fake coordinates, the burned records, the special furnace that ran "probably 12 hours a day."',
      'On July 16, 1973, Secretary of Defense James Schlesinger admitted to Congress that the bombing had been secret. Knight testified. The furnace had destroyed thousands of documents—but enough survived.',
      'Senator Stuart Symington\'s investigation concluded the administration had "lied to Congress." Representative Robert Drinan introduced the first impeachment resolution against Nixon, citing "the totally secret air war in Cambodia for 14 months."',
      'But Watergate consumed the oxygen. Cambodia became Article I of the impeachment inquiry—then was dropped from the final articles. The Case-Church Amendment passed, forcing an end to bombing. On August 15, 1973, the last American bombs fell on Cambodia.',
    ],
    figures: [
      {
        name: 'Senator Stuart Symington',
        role: 'Armed Services Committee Member',
        contributions: [
          'Led 1973 investigation into secret bombing',
          'Concluded administration "lied to Congress"',
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Portrait_of_W._Stuart_Symington_97-1844.jpg',
        imageAlt: 'Senator Stuart Symington',
        imageAttribution: 'Truman Library, Public Domain',
      },
      {
        name: 'Representative Robert Drinan',
        role: 'First to Propose Nixon Impeachment',
        contributions: [
          'Introduced impeachment resolution (July 31, 1973)',
          'Cited "the totally secret air war in Cambodia"',
        ],
        quote: 'How can we impeach the President for concealing a burglary but not for concealing a massive bombing?',
        quoteSource: 'Congressional Record, 1973',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Robert_Drinan.jpg',
        imageAlt: 'Representative Robert Drinan',
        imageAttribution: 'U.S. House of Representatives, Public Domain',
      },
      {
        name: 'Senator J. William Fulbright',
        role: 'Chairman, Foreign Relations Committee',
        contributions: [
          'Longest-serving chair of Foreign Relations (1959-1974)',
          'Dual reporting system specifically designed to deceive his committee',
          'Led televised Vietnam War hearings',
        ],
        quote: 'Does the President assert—as kings of old—that as Commander in Chief he can order American forces anywhere for any purpose that suits him?',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/J._William_Fulbright_in_1960_%283x4_cropped%29.jpg',
        imageAlt: 'Senator J. William Fulbright',
        imageAttribution: 'U.S. Senate, Public Domain',
      },
      {
        name: 'Senator Frank Church',
        role: 'Co-author, Case-Church Amendment',
        contributions: [
          'Co-authored Cooper-Church (1970) restricting Cambodia operations',
          'Co-authored Case-Church (1973) ending combat operations',
          'Later chaired Church Committee on intelligence abuses',
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Frank_Church_1961_Congressional_Portrait.png',
        imageAlt: 'Senator Frank Church',
        imageAttribution: 'U.S. Senate, Public Domain',
      },
      {
        name: 'Senator Thomas Eagleton',
        role: 'Sponsor, Eagleton Amendment',
        contributions: [
          'Sponsored amendment to cut bombing funds (1973)',
          'Forced August 15, 1973 deadline for end of operations',
          'Key figure in congressional pushback against executive war powers',
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Thomas_Eagleton_%28D-MO%29_%28cropped%29.jpg',
        imageAlt: 'Senator Thomas Eagleton',
        imageAttribution: 'U.S. Senate, Public Domain',
      },
    ],
    hasScrollLock: true,
    scrollLockType: 'furnace',
  },
  {
    id: 'data-war',
    number: 7,
    title: 'The Data War',
    temporal: '2000-2015 — Declassification and Debate',
    era: 'postwar',
    metaphor: 'The digit that changed history — how a database error inflated tonnage by 5x.',
    content: [
      'In 2000, President Clinton declassified U.S. Air Force bombing records during a visit to Vietnam. Researchers finally had data. Yale scholars Ben Kiernan and Taylor Owen analyzed the records, publishing their findings in 2006.',
      'Their initial claim: 2.7 million tons—more than all bombs dropped on Germany in World War II. The number entered public discourse, repeated in documentaries and scholarship. It became the defining statistic of the Cambodia bombing.',
      'But the number was wrong. Holly High and other researchers discovered a systematic error in the SEADAB database. The "Load Weight" field had been corrupted—multiplied by 10. Subsequent analysis corrected the figure dramatically.',
      'Owen and Kiernan publicly acknowledged the error. The corrected consensus: approximately 500,000 tons—still more than all bombs dropped on Japan in World War II, still devastating, but not the apocalyptic figure originally claimed. This essay uses the corrected number.',
    ],
    figures: [
      {
        name: 'Ben Kiernan',
        role: 'Yale Historian',
        contributions: [
          'Founded Cambodian Genocide Program at Yale',
          'Co-authored "Bombs Over Cambodia" (2006)',
          'Later publicly corrected tonnage estimate',
        ],
      },
      {
        name: 'Taylor Owen',
        role: 'McGill Scholar',
        contributions: [
          'Obtained and analyzed declassified USAF data',
          'Co-authored influential 2006 analysis',
          'Publicly acknowledged database error and correction',
        ],
      },
      {
        name: 'Holly High',
        role: 'University of Sydney Researcher',
        contributions: [
          'Identified systematic errors in SEADAB tonnage data',
          'Led re-analysis of bombing database records',
          'Published critical correction in Journal of Vietnamese Studies (2013)',
        ],
      },
    ],
    statistics: [
      { value: '2.7M', label: 'Initial claim (tons)', source: 'Owen & Kiernan, 2006' },
      { value: '~500K', label: 'Corrected estimate (tons)', source: 'Kiernan & Owen, 2015' },
      { value: '230,516', label: 'Total sorties', source: 'Yale CGEO Database' },
    ],
    comparisonSlider: {
      beforeLabel: 'Initial Claim (2006)',
      afterLabel: 'Corrected Estimate (2015)',
      beforeValue: '2.7 Million Tons',
      afterValue: '~500,000 Tons',
      caption: 'The widely-cited 2.7 million ton figure was publicly retracted by its original authors in 2015 after database errors were discovered.',
      source: 'Kiernan & Owen, The Asia-Pacific Journal (2015)',
    },
  },
  {
    id: 'unintended-consequence',
    number: 8,
    title: 'The Unintended Consequence',
    temporal: '1969-1975 — Bombing and the Rise of the Khmer Rouge',
    era: 'war',
    metaphor: 'Seeds of genocide — how bombs planted the roots of what followed.',
    content: [
      'The Khmer Rouge numbered perhaps 1,000 fighters in 1969. By 1973, they fielded an estimated 220,000. Something had changed—and historians debate what role the bombing played.',
      'A May 1973 CIA assessment noted that the Khmer Rouge used the bombing as "the main theme of their propaganda." A GAO report found that 60% of refugees cited bombing as their reason for displacement. Survivor testimony describes joining the resistance after raids destroyed villages.',
      'The causal chain is debated. Ben Kiernan argues the bombing was decisive. Others point to Sihanouk\'s overthrow and subsequent endorsement of the Khmer Rouge, North Vietnamese support, pre-existing communist organization, and economic collapse from the civil war.',
      'What is undeniable: the bombing destabilized Cambodia, displaced millions, and created conditions the Khmer Rouge exploited. On April 17, 1975—five years after the first acknowledged bombs fell—the Khmer Rouge entered Phnom Penh. What followed was genocide.',
    ],
    figures: [
      {
        name: 'Pol Pot (Saloth Sar)',
        role: 'Khmer Rouge Leader',
        contributions: [
          'Led communist insurgency during bombing period',
          'Exploited bombing devastation for recruitment',
          'Seized power April 17, 1975',
          'Oversaw genocide that killed 1.7-2 million',
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Pol_Pot_%28cropped%29.jpg',
        imageAlt: 'Pol Pot in 1978',
        imageAttribution: 'Public Domain',
      },
    ],
    statistics: [
      { value: '~1,000', label: 'Khmer Rouge (1969)', source: 'Kiernan' },
      { value: '220,000', label: 'Khmer Rouge (1973)', source: 'CIA estimates' },
      { value: '60%', label: 'Refugees citing bombing', source: 'GAO Report' },
    ],
  },
  {
    id: 'reckoning',
    number: 9,
    title: 'The Reckoning That Wasn\'t',
    temporal: '1973-Present — Accountability and Memory',
    era: 'postwar',
    metaphor: 'The memorial that doesn\'t exist — how the bombing lives in a commemorative shadow.',
    content: [
      'The War Powers Resolution of 1973 emerged directly from the Cambodia bombing—an attempt to constrain future presidents from waging war without congressional approval. It remains the most concrete legislative legacy of the secret campaign.',
      'Drinan\'s impeachment article citing Cambodia was rejected 26-12 by the House Judiciary Committee. Watergate prevailed. Nixon resigned over a break-in, not a bombing.',
      'The Vietnam Veterans Memorial in Washington bears 58,215 American names. Cambodia\'s memorials commemorate the Khmer Rouge genocide—Tuol Sleng, Choeung Ek, the killing fields. There is no comparable memorial for the bombing\'s Cambodian victims.',
      'No formal U.S. apology has been issued. No reparations have been paid. The bombing exists in a strange commemorative vacuum—acknowledged in scholarship, largely absent from public memory.',
    ],
    figures: [
      {
        name: 'Representative Elizabeth Holtzman',
        role: 'Congresswoman (D-NY)',
        contributions: [
          'Filed lawsuit to stop Cambodia bombing in federal court',
          'Won initial injunction from Judge Judd (July 25, 1973)',
          'Supreme Court vacated the injunction six hours later',
        ],
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Elizabeth_Holtzman.jpg',
        imageAlt: 'Representative Elizabeth Holtzman',
        imageAttribution: 'Public Domain',
      },
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Vietnam_Memorial_Wall_with_Washington_Monument.jpg',
        alt: 'Vietnam Veterans Memorial Wall with Washington Monument',
        caption: 'The Vietnam Veterans Memorial in Washington, D.C. bears 58,215 American names. No comparable memorial exists for Cambodian bombing victims.',
        attribution: 'Hu Totya, CC BY-SA 4.0, via Wikimedia Commons',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Tuol_Sleng_-_S21_-_Phnom_Penh_-_07.JPG/960px-Tuol_Sleng_-_S21_-_Phnom_Penh_-_07.JPG',
        alt: 'Tuol Sleng Genocide Museum (S-21 Prison)',
        caption: 'Tuol Sleng Genocide Museum in Phnom Penh—a former high school converted to a Khmer Rouge interrogation center. Cambodia\'s memorials commemorate the genocide, not the bombing that preceded it.',
        attribution: 'Adam63, CC BY-SA 3.0, via Wikimedia Commons',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Choeung_Ek_stupa_skulls.JPG/960px-Choeung_Ek_stupa_skulls.JPG',
        alt: 'Choeung Ek memorial stupa with skulls',
        caption: 'The memorial stupa at Choeung Ek, one of the "Killing Fields," holds the skulls of genocide victims. The bombing\'s role in destabilizing Cambodia remains debated but documented.',
        attribution: 'CC BY 3.0, via Wikimedia Commons',
      },
    ],
  },
  {
    id: 'still-unfinished',
    number: 10,
    title: 'Still Unfinished',
    temporal: '1979-Present — The Bombs That Still Kill',
    era: 'contemporary',
    metaphor: 'The war that won\'t end — 50 years later, the bombs are still being cleared.',
    content: [
      'The bombing ended on August 15, 1973. The dying continued. Unexploded ordnance—bombs, cluster munitions, artillery shells—remained scattered across Cambodian soil. They are still being found.',
      'Since 1979, unexploded ordnance has killed or injured over 65,000 Cambodians. The casualty rate has dropped dramatically—from 4,320 in 1996 to 49 in 2024—but approximately one person is still killed or injured every week.',
      'Today, 1,856 square kilometers of Cambodia remain contaminated. Cambodia created a unique Sustainable Development Goal—SDG 18—specifically for mine action. Organizations like CMAC, HALO Trust, MAG, and APOPO work to clear the soil.',
      'The original goal was a mine-free Cambodia by 2025. That deadline has been revised to 2030. The work continues. The war you weren\'t meant to see is still being cleaned up, bomb by bomb, field by field, life by life.',
    ],
    figures: [
      {
        name: 'CMAC Deminers',
        role: 'Cambodian Mine Action Centre',
        contributions: [
          '596,168 mines destroyed since 1992',
          '2,537,335 explosive remnants of war (ERW) cleared',
          'National organization leading clearance efforts',
        ],
      },
      {
        name: 'APOPO HeroRATs',
        role: 'Mine Detection Animals',
        contributions: [
          'African Giant Pouched Rats trained to detect explosives',
          'Clear a tennis court-sized area in 20 minutes (vs. 4 days for humans)',
          'Too light to trigger mines—perfect for detection work',
          'Belgian NGO operates in Cambodia since 2015',
        ],
      },
    ],
    statistics: [
      { value: '65,000+', label: 'Casualties since 1979', source: 'CMAC' },
      { value: '1,856 km²', label: 'Still contaminated', source: 'Mine Action Review, 2024' },
      { value: '49', label: 'Casualties in 2024', source: 'CMAC' },
      { value: '99%', label: 'Reduction since 1996', source: 'CMAC' },
    ],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/BLU-26_cluster_sub-munition.JPG',
        alt: 'BLU-26 cluster submunition',
        caption: 'A BLU-26 cluster bomblet—one of millions dropped on Cambodia. These submunitions scatter across wide areas and often fail to detonate, becoming deadly UXO.',
        attribution: 'Seabifar, CC BY-SA 3.0, via Wikimedia Commons',
      },
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/2/22/A_man_feeding_a_rat_at_the_Apopo_rat_training_in_Tanzania.jpg',
        alt: 'APOPO mine detection rat being trained',
        caption: 'APOPO trains African Giant Pouched Rats to detect explosives. A single rat can clear a tennis court-sized area in 20 minutes—a task that takes humans up to 4 days.',
        attribution: 'Mx. Granger, CC0, via Wikimedia Commons',
      },
    ],
    hasScrollLock: true,
    scrollLockType: 'unfinished',
  },
];

const GLOSSARY: GlossaryTerm[] = [
  { term: 'AFHRA', definition: 'Air Force Historical Research Agency—repository of USAF records' },
  { term: 'APOPO', definition: 'Belgian NGO using trained rats (HeroRATs) for mine detection' },
  { term: 'Arc Light', definition: 'Code name for B-52 bombing missions in Southeast Asia' },
  { term: 'Base Area', definition: 'Designated target zones along Cambodia-Vietnam border' },
  { term: 'B-52 Stratofortress', definition: 'Heavy bomber used for carpet bombing operations' },
  { term: 'BLU-26', definition: 'Cluster bomblet submunition; millions dropped on Cambodia' },
  { term: 'Cambodia Incursion', definition: 'U.S. ground invasion of Cambodia (April-June 1970)' },
  { term: 'Carpet Bombing', definition: 'Area bombardment without specific point targets' },
  { term: 'Case-Church Amendment', definition: '1973 law ending U.S. combat operations in Southeast Asia' },
  { term: 'CGEO', definition: 'Yale\'s Cambodian Genocide Geographic Database' },
  { term: 'Cluster Munitions', definition: 'Bombs releasing multiple submunitions over a wide area' },
  { term: 'CMAC', definition: 'Cambodian Mine Action Centre—national clearance organization' },
  { term: 'Cooper-Church Amendment', definition: '1970 law restricting ground operations in Cambodia' },
  { term: 'COSVN', definition: 'Central Office for South Vietnam—Vietnamese communist command structure' },
  { term: 'Daniel Boone Operations', definition: 'Covert cross-border reconnaissance (later Salem House)' },
  { term: 'Democratic Kampuchea', definition: 'Official name of Cambodia under Khmer Rouge (1975-1979)' },
  { term: 'Dual Reporting System', definition: 'Method used to falsify official bombing records' },
  { term: 'ERW', definition: 'Explosive Remnants of War' },
  { term: 'Fishhook', definition: 'Border region containing Base Areas 352 and 353' },
  { term: 'FOIA', definition: 'Freedom of Information Act—law enabling document declassification' },
  { term: 'FRUS', definition: 'Foreign Relations of the United States—official document series' },
  { term: 'GAO', definition: 'Government Accountability Office (formerly General Accounting Office)' },
  { term: 'HALO Trust', definition: 'British humanitarian demining organization' },
  { term: 'HeroRAT', definition: 'African Giant Pouched Rat trained to detect explosives' },
  { term: 'Khmer Republic', definition: 'U.S.-backed Cambodian government (1970-1975) under Lon Nol' },
  { term: 'Khmer Rouge', definition: 'Cambodian communist movement (1968-1999)' },
  { term: 'Kent State', definition: 'University where four students were killed protesting Cambodia invasion (May 4, 1970)' },
  { term: 'Lon Nol', definition: 'Cambodian general who seized power in March 1970 coup' },
  { term: 'MACV', definition: 'Military Assistance Command, Vietnam' },
  { term: 'MAG', definition: 'Mines Advisory Group—international clearance organization' },
  { term: 'Menu Operations', definition: 'Secret bombing phases: Breakfast, Lunch, Snack, Dinner, Supper, Dessert' },
  { term: 'NSA', definition: 'National Security Archive at George Washington University' },
  { term: 'NSC', definition: 'National Security Council' },
  { term: 'Operation Breakfast', definition: 'First secret bombing strike (March 18, 1969)' },
  { term: 'Operation Freedom Deal', definition: 'Expanded bombing campaign (May 1970 - August 1973)' },
  { term: 'Operation Menu', definition: 'Secret bombing campaign (March 1969 - May 1970)' },
  { term: 'Parrot\'s Beak', definition: 'Border region projecting toward Saigon' },
  { term: 'PAVN', definition: 'People\'s Army of Vietnam (North Vietnamese Army)' },
  { term: 'Phnom Penh', definition: 'Capital of Cambodia; fell to Khmer Rouge April 17, 1975' },
  { term: 'Pol Pot', definition: 'Khmer Rouge leader (born Saloth Sar); oversaw 1975-1979 genocide' },
  { term: 'Sanctuary', definition: 'Vietnamese communist base areas inside Cambodian territory' },
  { term: 'SDG 18', definition: 'Cambodia\'s unique Sustainable Development Goal for mine action' },
  { term: 'SEADAB', definition: 'Southeast Asia Database—USAF bombing records' },
  { term: 'Sihanouk Trail', definition: 'Supply route through Cambodia to Vietnamese communist forces' },
  { term: 'Sortie', definition: 'Single aircraft mission' },
  { term: 'Telcon', definition: 'Telephone conversation transcript' },
  { term: 'Tonnage', definition: 'Bomb weight measurement; Cambodia received ~500,000 tons' },
  { term: 'UXO', definition: 'Unexploded Ordnance' },
  { term: 'War Powers Resolution', definition: '1973 law restricting presidential war authority' },
  { term: 'WSAG', definition: 'Washington Special Actions Group—NSC crisis management body' },
];

const SOURCES: Source[] = [
  // Primary Sources
  { type: 'primary', citation: 'Foreign Relations of the United States, 1969-1976, Volume VI: Vietnam, January 1969 – July 1970', url: 'https://history.state.gov/historicaldocuments/frus1969-76v06' },
  { type: 'primary', citation: 'National Security Archive, Kissinger Telcons Collection', url: 'https://nsarchive.gwu.edu/' },
  { type: 'primary', citation: 'Nixon Presidential Library, NSC Files', url: 'https://www.nixonlibrary.gov/' },
  { type: 'primary', citation: 'Congressional Record, 93rd Congress' },
  { type: 'primary', citation: 'Senate Armed Services Committee, "Bombing in Cambodia" Hearings (1973)' },
  { type: 'primary', citation: 'USAF Historical Research Agency Records', url: 'https://www.afhra.af.mil/' },
  { type: 'primary', citation: 'CIA FOIA Electronic Reading Room', url: 'https://www.cia.gov/readingroom/' },
  // Academic Sources
  { type: 'academic', citation: 'Kiernan, Ben. "The American Bombardment of Kampuchea, 1969-1973." Vietnam Generation (1989)' },
  { type: 'academic', citation: 'Owen, Taylor and Ben Kiernan. "Bombs Over Cambodia." The Walrus (2006)', url: 'https://thewalrus.ca/bombs-over-cambodia/' },
  { type: 'academic', citation: 'Kiernan, Ben and Taylor Owen. "Making More Enemies than We Kill?" The Asia-Pacific Journal (2015)' },
  { type: 'academic', citation: 'High, Holly, et al. "Electronic Records of the Air War Over Southeast Asia." Journal of Vietnamese Studies (2013)' },
  { type: 'academic', citation: 'Shawcross, William. Sideshow: Kissinger, Nixon, and the Destruction of Cambodia. Simon & Schuster (1979, 2002)' },
  { type: 'academic', citation: 'Kiernan, Ben. How Pol Pot Came to Power. Yale University Press (1985, 2004)' },
  { type: 'academic', citation: 'Kiernan, Ben. The Pol Pot Regime: Race, Power, and Genocide in Cambodia. Yale University Press (1996, 2008)' },
  { type: 'academic', citation: 'Chandler, David P. The Tragedy of Cambodian History. Yale University Press (1991)' },
  { type: 'academic', citation: 'Clymer, Kenton. The United States and Cambodia, 1969-2000. Routledge (2004)' },
  // Data Sources
  { type: 'data', citation: 'Yale Genocide Studies Program, CGEO Database', url: 'https://gsp.yale.edu/' },
  { type: 'data', citation: 'CMAC Annual Reports', url: 'https://cmac.gov.kh/' },
  { type: 'data', citation: 'Mine Action Review, Cambodia Country Profile', url: 'https://www.mineactionreview.org/country/cambodia' },
  { type: 'data', citation: 'HALO Trust Cambodia Statistics', url: 'https://www.halotrust.org/where-we-work/south-and-southeast-asia/cambodia/' },
  { type: 'data', citation: 'MAG International Reports', url: 'https://www.maginternational.org/' },
  // Contemporary Sources
  { type: 'contemporary', citation: 'HISTORY.com: Operation Menu', url: 'https://www.history.com/' },
  { type: 'contemporary', citation: 'National Security Archive: Kissinger Declassified', url: 'https://nsarchive.gwu.edu/project/kissinger-telcons' },
  { type: 'contemporary', citation: 'Khmer Times: Mine Action Coverage', url: 'https://www.khmertimeskh.com/' },
  { type: 'contemporary', citation: 'Radio Free Asia: Cambodia', url: 'https://www.rfa.org/english/news/cambodia' },
  { type: 'contemporary', citation: 'Open Development Cambodia', url: 'https://opendevelopmentcambodia.net/' },
];

// ============================================================================
// HOOKS
// ============================================================================

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const currentProgress = Math.min((scrollTop / documentHeight) * 100, 100);

      setProgress(currentProgress);
      setShowProgressBar(scrollTop > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { progress, showProgressBar };
}

// ============================================================================
// COMPONENTS
// ============================================================================

function ProgressBar({ progress, visible }: { progress: number; visible: boolean }) {
  const status = getClassificationStatus(progress);

  return (
    <div className={`progress-bar ${visible ? 'progress-bar--visible' : ''}`}>
      <div className="progress-bar__container">
        <span className="progress-bar__status">{status}</span>
        <div className="progress-bar__track">
          <div
            className="progress-bar__fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="progress-bar__markers">
          {['CLASSIFIED', 'LEAKED', 'DENIED', 'DEBATED', 'DECLASSIFIED', 'STILL UNFINISHED'].map((marker) => (
            <span
              key={marker}
              className={`progress-bar__marker ${status === marker ? 'progress-bar__marker--active' : ''}`}
            >
              {marker}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__background">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0d/B-52D_dropping_bombs_over_Vietnam.jpg"
          alt="B-52 bomber dropping bombs"
          loading="eager"
        />
      </div>
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="hero__quote">
          Anything that flies on anything that moves.
        </p>
        <p style={{ fontFamily: 'var(--font-data)', fontSize: '0.75rem', color: 'var(--color-gray)', marginTop: '-1rem', marginBottom: '2rem' }}>
          — Henry Kissinger, December 9, 1970
        </p>
        <h1 className="hero__title">
          Cambodia Bombed<br />(1965–1973)
        </h1>
        <p className="hero__subtitle">
          The Air War You Weren&apos;t Meant to See — Visualized
        </p>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-value">~500,000</span>
            <span className="hero__stat-label">Tons of bombs</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value">50-150K</span>
            <span className="hero__stat-label">Civilian deaths (est.)</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value">65,000+</span>
            <span className="hero__stat-label">UXO casualties since 1979</span>
          </div>
        </div>
      </div>
      <div className="hero__scroll-indicator">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  );
}

function FigureCard({ figure }: { figure: Figure }) {
  return (
    <div className="figure-card">
      <div className="figure-card__image-container">
        {figure.imageUrl ? (
          <img
            src={figure.imageUrl}
            alt={figure.imageAlt || figure.name}
            className="figure-card__image"
            loading="lazy"
          />
        ) : (
          <div className="figure-card__placeholder">No image</div>
        )}
      </div>
      <div className="figure-card__info">
        <h4 className="figure-card__name">{figure.name}</h4>
        <p className="figure-card__role">{figure.role}</p>
        <ul className="figure-card__contributions">
          {figure.contributions.slice(0, 4).map((contribution, i) => (
            <li key={i} className="figure-card__contribution">{contribution}</li>
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
      </div>
    </div>
  );
}

function StatisticsBlock({ statistics }: { statistics: Statistic[] }) {
  return (
    <div className="stats-block">
      {statistics.map((stat, i) => (
        <div key={i} className="stat-item">
          <span className="stat-item__value">{stat.value}</span>
          <span className="stat-item__label">{stat.label}</span>
          <span className="stat-item__source">{stat.source}</span>
        </div>
      ))}
    </div>
  );
}

function ScrollLockSequence({ type, onSkip }: { type: string; onSkip: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [unpinPoint, setUnpinPoint] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Height multiplier based on sequence type
  const heightVh = type === 'ball-game' ? 400 : type === 'anything-flies' ? 350 : 300;

  useEffect(() => {
    if (isComplete) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = containerHeight - viewportHeight;
      const scrolledIntoSection = -rect.top;

      if (rect.top <= 0 && scrolledIntoSection <= scrollableDistance) {
        // STATE 1: Currently in scroll-lock zone - PINNED
        setIsPinned(true);
        setIsExiting(false);
        const newProgress = Math.min(1, Math.max(0, scrolledIntoSection / scrollableDistance));
        setProgress(newProgress);
      } else if (rect.top > 0) {
        // STATE 2: Before scroll-lock zone (haven't entered yet)
        setIsPinned(false);
        setIsExiting(false);
        setProgress(0);
      } else {
        // STATE 3: After scroll-lock zone - SMOOTH EXIT
        setIsPinned(false);
        setIsExiting(true);
        setProgress(1);
        setUnpinPoint(scrollableDistance);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isComplete]);

  // Ball Game sequence content (Chapter 2 - Operation Breakfast)
  const renderBallGame = () => {
    const stage = progress < 0.2 ? 1 : progress < 0.4 ? 2 : progress < 0.6 ? 3 : progress < 0.8 ? 4 : 5;

    return (
      <div className="scroll-lock__staged-content">
        {/* Stage 1: Radar sweep */}
        <div className={`scroll-lock__stage ${stage >= 1 ? 'scroll-lock__stage--visible' : ''}`}>
          <div className="scroll-lock__radar">
            <div className="scroll-lock__radar-sweep" style={{ opacity: stage === 1 ? 1 : 0.3 }} />
          </div>
        </div>

        {/* Stage 2: Coordinates */}
        <div className={`scroll-lock__stage ${stage >= 2 ? 'scroll-lock__stage--visible' : ''}`}>
          <div className="scroll-lock__coordinates">
            <span className="scroll-lock__coord">BASE AREA 353</span>
            <span className="scroll-lock__coord">11°45&apos;N 106°30&apos;E</span>
          </div>
        </div>

        {/* Stage 3: Code name */}
        <div className={`scroll-lock__stage ${stage >= 3 ? 'scroll-lock__stage--visible' : ''}`}>
          <div className="scroll-lock__codename">BREAKFAST</div>
        </div>

        {/* Stage 4: Strike visualization */}
        <div className={`scroll-lock__stage ${stage >= 4 ? 'scroll-lock__stage--visible' : ''}`}>
          <div className="scroll-lock__strike-count">
            <span className="scroll-lock__count-value">48-60</span>
            <span className="scroll-lock__count-label">B-52 STRATOFORTRESS</span>
          </div>
        </div>

        {/* Stage 5: Mission complete */}
        <div className={`scroll-lock__stage ${stage >= 5 ? 'scroll-lock__stage--visible' : ''}`}>
          <blockquote className="scroll-lock__final-quote">
            <span className="scroll-lock__quote-text">&ldquo;The ball game is over.&rdquo;</span>
            <cite className="scroll-lock__quote-source">— Mission Completion Code, March 18, 1969</cite>
          </blockquote>
        </div>
      </div>
    );
  };

  // Anything Flies sequence content (Chapter 5 - The Order)
  const renderAnythingFlies = () => {
    const stage = progress < 0.3 ? 1 : progress < 0.6 ? 2 : progress < 0.8 ? 3 : 4;
    const quoteText = "Anything that flies on anything that moves.";
    const visibleChars = stage >= 2 ? Math.floor((progress - 0.3) / 0.3 * quoteText.length) : 0;

    return (
      <div className="scroll-lock__staged-content">
        {/* Stage 1: Transcript header */}
        <div className={`scroll-lock__stage ${stage >= 1 ? 'scroll-lock__stage--visible' : ''}`}>
          <div className="scroll-lock__transcript-header">
            <span className="scroll-lock__transcript-label">TELEPHONE CONVERSATION</span>
            <span className="scroll-lock__transcript-parties">KISSINGER — HAIG</span>
            <span className="scroll-lock__transcript-date">December 9, 1970</span>
          </div>
        </div>

        {/* Stage 2: Typing quote */}
        <div className={`scroll-lock__stage ${stage >= 2 ? 'scroll-lock__stage--visible' : ''}`}>
          <div className="scroll-lock__typing-container">
            <span className="scroll-lock__typing-text">
              &ldquo;{quoteText.substring(0, Math.min(visibleChars, quoteText.length))}&rdquo;
              {visibleChars < quoteText.length && <span className="scroll-lock__cursor">|</span>}
            </span>
          </div>
        </div>

        {/* Stage 3: Haig laughs */}
        <div className={`scroll-lock__stage ${stage >= 3 ? 'scroll-lock__stage--visible' : ''}`}>
          <div className="scroll-lock__reaction">(Haig laughs)</div>
        </div>

        {/* Stage 4: Classification stamp */}
        <div className={`scroll-lock__stage ${stage >= 4 ? 'scroll-lock__stage--visible' : ''}`}>
          <div className="scroll-lock__stamp">
            <span className="scroll-lock__stamp-text">DECLASSIFIED</span>
            <span className="scroll-lock__stamp-date">National Security Archive</span>
          </div>
        </div>
      </div>
    );
  };

  // Furnace sequence content (Chapter 6)
  const renderFurnace = () => {
    const stage = progress < 0.3 ? 1 : progress < 0.6 ? 2 : progress < 0.9 ? 3 : 4;

    return (
      <div className="scroll-lock__staged-content">
        <div className={`scroll-lock__stage ${stage >= 1 ? 'scroll-lock__stage--visible' : ''}`}>
          <div className="scroll-lock__document-stack">
            <div className="scroll-lock__document" />
            <div className="scroll-lock__document" />
            <div className="scroll-lock__document" />
          </div>
        </div>

        <div className={`scroll-lock__stage ${stage >= 2 ? 'scroll-lock__stage--visible' : ''}`}>
          <div className="scroll-lock__flames" />
        </div>

        <div className={`scroll-lock__stage ${stage >= 3 ? 'scroll-lock__stage--visible' : ''}`}>
          <blockquote className="scroll-lock__final-quote">
            <span className="scroll-lock__quote-text">&ldquo;Probably 12 hours a day.&rdquo;</span>
            <cite className="scroll-lock__quote-source">— Major Hal Knight on document destruction</cite>
          </blockquote>
        </div>
      </div>
    );
  };

  // Still Unfinished sequence content (Chapter 10)
  const renderUnfinished = () => {
    const stage = progress < 0.3 ? 1 : progress < 0.6 ? 2 : progress < 0.8 ? 3 : 4;

    return (
      <div className="scroll-lock__staged-content">
        <div className={`scroll-lock__stage ${stage >= 1 ? 'scroll-lock__stage--visible' : ''}`}>
          <div className="scroll-lock__year-label">1973</div>
        </div>

        <div className={`scroll-lock__stage ${stage >= 2 ? 'scroll-lock__stage--visible' : ''}`}>
          <div className="scroll-lock__arrow-down">→</div>
          <div className="scroll-lock__year-label">2024</div>
        </div>

        <div className={`scroll-lock__stage ${stage >= 3 ? 'scroll-lock__stage--visible' : ''}`}>
          <div className="scroll-lock__stat-reveal">
            <span className="scroll-lock__stat-number">1,856 km²</span>
            <span className="scroll-lock__stat-label">still contaminated</span>
          </div>
        </div>

        <div className={`scroll-lock__stage ${stage >= 4 ? 'scroll-lock__stage--visible' : ''}`}>
          <div className="scroll-lock__stat-reveal">
            <span className="scroll-lock__stat-number">~1</span>
            <span className="scroll-lock__stat-label">casualty per week</span>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (type) {
      case 'ball-game': return renderBallGame();
      case 'anything-flies': return renderAnythingFlies();
      case 'furnace': return renderFurnace();
      case 'unfinished': return renderUnfinished();
      default: return renderBallGame();
    }
  };

  const handleSkip = () => {
    setIsComplete(true);
    onSkip();
  };

  return (
    <div
      ref={containerRef}
      className={`scroll-lock scroll-lock--${type}`}
      style={{ height: `${heightVh}vh`, position: 'relative' }}
    >
      <div
        className={`scroll-lock__pinned-content ${isPinned ? 'scroll-lock__pinned-content--pinned' : ''}`}
        style={isExiting ? {
          position: 'absolute',
          top: `${unpinPoint}px`,
          left: 0,
          right: 0,
          height: '100vh',
        } : undefined}
      >
        {renderContent()}

        <div className="scroll-lock__progress">
          <div className="scroll-lock__progress-bar" style={{ width: `${progress * 100}%` }} />
        </div>

        <button className="scroll-lock__skip" onClick={handleSkip}>
          Skip sequence
        </button>
      </div>
    </div>
  );
}

function OperationMenuBreakdown() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="operation-menu-breakdown">
      <button
        className="operation-menu-breakdown__toggle"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <span className="operation-menu-breakdown__toggle-label">
          Operation Menu: Interactive Breakdown
        </span>
        <span className="operation-menu-breakdown__toggle-icon">
          {expanded ? '−' : '+'}
        </span>
      </button>

      {expanded && (
        <div className="operation-menu-breakdown__content">
          <div className="operation-menu-breakdown__grid">
            {OPERATION_MENU_DATA.map((op) => (
              <div key={op.code} className="operation-menu-breakdown__item">
                <div className="operation-menu-breakdown__header">
                  <span className="operation-menu-breakdown__code">{op.code}</span>
                  <span className="operation-menu-breakdown__name">{op.name}</span>
                </div>
                <div className="operation-menu-breakdown__details">
                  <div className="operation-menu-breakdown__detail">
                    <span className="operation-menu-breakdown__label">Base Area</span>
                    <span className="operation-menu-breakdown__value">{op.baseArea}</span>
                  </div>
                  <div className="operation-menu-breakdown__detail">
                    <span className="operation-menu-breakdown__label">Date Range</span>
                    <span className="operation-menu-breakdown__value">{op.dateRange}</span>
                  </div>
                  <div className="operation-menu-breakdown__detail">
                    <span className="operation-menu-breakdown__label">Sorties</span>
                    <span className="operation-menu-breakdown__value">{op.sorties.toLocaleString()}</span>
                  </div>
                  <div className="operation-menu-breakdown__detail">
                    <span className="operation-menu-breakdown__label">Tonnage</span>
                    <span className="operation-menu-breakdown__value">{op.tonnage.toLocaleString()} tons</span>
                  </div>
                </div>
                <div className="operation-menu-breakdown__bar">
                  <div
                    className="operation-menu-breakdown__bar-fill"
                    style={{ width: `${(op.tonnage / 40000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="operation-menu-breakdown__totals">
            <div className="operation-menu-breakdown__total">
              <span className="operation-menu-breakdown__total-value">{MENU_TOTALS.sorties.toLocaleString()}</span>
              <span className="operation-menu-breakdown__total-label">Total Sorties</span>
            </div>
            <div className="operation-menu-breakdown__total">
              <span className="operation-menu-breakdown__total-value">{MENU_TOTALS.tonnage.toLocaleString()}</span>
              <span className="operation-menu-breakdown__total-label">Total Tons</span>
            </div>
            <div className="operation-menu-breakdown__total">
              <span className="operation-menu-breakdown__total-value">{MENU_TOTALS.duration}</span>
              <span className="operation-menu-breakdown__total-label">Duration</span>
            </div>
          </div>

          <p className="operation-menu-breakdown__source">
            Source: {MENU_TOTALS.source}
          </p>
        </div>
      )}
    </div>
  );
}

function TonnageComparisonSlider({ slider }: { slider: ComparisonSlider }) {
  const [position, setPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(newPosition);
  }, []);

  const handleMouseDown = useCallback(() => {
    isDragging.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  }, [handleMove]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  return (
    <div className="tonnage-comparison">
      <div
        ref={sliderRef}
        className="tonnage-comparison__slider"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={position}
        aria-label="Comparison slider"
        tabIndex={0}
      >
        <div className="tonnage-comparison__before" style={{ width: `${position}%` }}>
          <div className="tonnage-comparison__panel tonnage-comparison__panel--before">
            <span className="tonnage-comparison__label">{slider.beforeLabel}</span>
            <span className="tonnage-comparison__value">{slider.beforeValue}</span>
          </div>
        </div>
        <div className="tonnage-comparison__after" style={{ width: `${100 - position}%` }}>
          <div className="tonnage-comparison__panel tonnage-comparison__panel--after">
            <span className="tonnage-comparison__label">{slider.afterLabel}</span>
            <span className="tonnage-comparison__value">{slider.afterValue}</span>
          </div>
        </div>
        <div className="tonnage-comparison__handle" style={{ left: `${position}%` }}>
          <div className="tonnage-comparison__handle-line" />
          <div className="tonnage-comparison__handle-grip">
            <span>⟨</span>
            <span>⟩</span>
          </div>
        </div>
      </div>
      <p className="tonnage-comparison__caption">{slider.caption}</p>
      <p className="tonnage-comparison__source">Source: {slider.source}</p>
    </div>
  );
}

function ChapterSection({ chapter }: { chapter: Chapter }) {
  const [showScrollLock, setShowScrollLock] = useState(true);

  return (
    <section
      id={chapter.id}
      className={`chapter chapter--era-${chapter.era}`}
    >
      {chapter.hasScrollLock && showScrollLock && (
        <ScrollLockSequence
          type={chapter.scrollLockType || 'ball-game'}
          onSkip={() => setShowScrollLock(false)}
        />
      )}

      <header className="chapter__header">
        <span className="chapter__number">Chapter {chapter.number}</span>
        <span className="chapter__temporal">{chapter.temporal}</span>
        <h2 className="chapter__title">{chapter.title}</h2>
        <p className="chapter__metaphor">{chapter.metaphor}</p>
      </header>

      <div className="chapter__content">
        {chapter.content.map((paragraph, i) => (
          <p key={i} className="chapter__paragraph">{paragraph}</p>
        ))}

        {chapter.statistics && chapter.statistics.length > 0 && (
          <StatisticsBlock statistics={chapter.statistics} />
        )}

        {chapter.hasOperationMenu && <OperationMenuBreakdown />}

        {chapter.comparisonSlider && <TonnageComparisonSlider slider={chapter.comparisonSlider} />}

        {chapter.figures && chapter.figures.map((figure, i) => (
          <FigureCard key={i} figure={figure} />
        ))}

        {chapter.images && chapter.images.map((image, i) => (
          <div key={i} className={`image-container image-container--${chapter.era === 'contemporary' ? 'contemporary' : 'war-era'}`}>
            <img
              src={image.url}
              alt={image.alt}
              className="image-container__img"
              loading="lazy"
            />
            {image.caption && (
              <p className="image-container__caption">
                {image.caption}
                {image.attribution && (
                  <span className="image-container__attribution"> — {image.attribution}</span>
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Glossary() {
  return (
    <section className="glossary">
      <h2 className="glossary__title">Glossary</h2>
      <div className="glossary__grid">
        {GLOSSARY.map((item, i) => (
          <div key={i} className="glossary__item">
            <dt className="glossary__term">{item.term}</dt>
            <dd className="glossary__definition">{item.definition}</dd>
          </div>
        ))}
      </div>
    </section>
  );
}

function Sources() {
  const groupedSources = {
    primary: SOURCES.filter(s => s.type === 'primary'),
    academic: SOURCES.filter(s => s.type === 'academic'),
    data: SOURCES.filter(s => s.type === 'data'),
    contemporary: SOURCES.filter(s => s.type === 'contemporary'),
  };

  return (
    <section className="sources">
      <h2 className="sources__title">Sources & Bibliography</h2>

      <div className="sources__section">
        <h3 className="sources__section-title">Primary Sources</h3>
        <ul className="sources__list">
          {groupedSources.primary.map((source, i) => (
            <li key={i} className="sources__item">
              {source.url ? (
                <a href={source.url} className="sources__link" target="_blank" rel="noopener noreferrer">
                  {source.citation}
                </a>
              ) : source.citation}
            </li>
          ))}
        </ul>
      </div>

      <div className="sources__section">
        <h3 className="sources__section-title">Academic Sources</h3>
        <ul className="sources__list">
          {groupedSources.academic.map((source, i) => (
            <li key={i} className="sources__item">{source.citation}</li>
          ))}
        </ul>
      </div>

      <div className="sources__section">
        <h3 className="sources__section-title">Data Sources</h3>
        <ul className="sources__list">
          {groupedSources.data.map((source, i) => (
            <li key={i} className="sources__item">
              {source.url ? (
                <a href={source.url} className="sources__link" target="_blank" rel="noopener noreferrer">
                  {source.citation}
                </a>
              ) : source.citation}
            </li>
          ))}
        </ul>
      </div>

      <div className="sources__section">
        <h3 className="sources__section-title">Contemporary Sources</h3>
        <ul className="sources__list">
          {groupedSources.contemporary.map((source, i) => (
            <li key={i} className="sources__item">
              {source.url ? (
                <a href={source.url} className="sources__link" target="_blank" rel="noopener noreferrer">
                  {source.citation}
                </a>
              ) : source.citation}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="essay-footer">
      <p className="essay-footer__date">Research compiled December 2024</p>
      <p className="essay-footer__attribution">
        A visual essay by{' '}
        <a href="https://esy.com" className="essay-footer__link">Esy</a>
      </p>
    </footer>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function CambodiaBombingClient() {
  const { progress, showProgressBar } = useScrollProgress();

  return (
    <article className="cambodia-bombing">
      <a href="#before-storm" className="skip-link">Skip to content</a>

      <ProgressBar progress={progress} visible={showProgressBar} />

      <Hero />

      {CHAPTERS.map((chapter) => (
        <ChapterSection key={chapter.id} chapter={chapter} />
      ))}

      <div className="cambodia-bombing__container">
        <div className="cambodia-bombing__content">
          <Glossary />
          <Sources />
        </div>
      </div>

      <Footer />
    </article>
  );
}
