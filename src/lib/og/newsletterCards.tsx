import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { OG_SIZE } from "./shareCard";
import { DESKS } from "@/components/EducationHero/desks";
import { getAllAgenticArticles } from "@/lib/published-articles";

/* Homepage share cards for esy.com as a Marketing Engineering publication
 * (2026-09-25). Three directions, all selling the same thing: the free weekly
 * email and what a reader gets from it. Compare them at /prototypes/og/.
 *
 *   A · Masthead  — the homepage hero as a card: light paper, the serif promise,
 *                   the four desks, "Subscribe free".
 *   B · The Offer — navy: the promise on the left, a card of what every issue
 *                   gives you on the right, a subscribe button under it.
 *   C · The Author— people first: Zev's portrait, a first-person promise, and
 *                   the newest real article's title.
 *
 * Feeds show these at ~550px wide and chat apps at ~300px, so every word is set
 * large enough to read at half size, and nothing important sits near an edge a
 * platform might crop. Type matches the site: Cormorant Garamond (the hero's
 * display serif) over Noto Sans, and the real Black Ops One wordmark. */

const PAPER = "#FFFFFF";
const NAVY = "#0A2540";
const INK = "#102033";
const INK_SOFT = "#41566D";
const JADE = "#00A896";
const JADE_TEXT = "#007F72"; // jade deepened for text on white
const JADE_BRIGHT = "#00D4AA";

type Variant = "masthead" | "offer" | "author";
export const NEWSLETTER_CARD_VARIANTS: Variant[] = ["masthead", "offer", "author"];

/** Every font the cards use, read once per render from public/fonts. */
async function loadFonts() {
  const read = (file: string) => readFile(join(process.cwd(), "public/fonts", file));
  const [wordmark, sans, serif, serifItalic] = await Promise.all([
    read("black-ops-one-regular.ttf"),
    read("noto-sans-regular.ttf"),
    read("cormorant-garamond-700-normal.ttf"),
    read("cormorant-garamond-700-italic.ttf"),
  ]);
  return [
    { name: "BlackOpsOne", data: wordmark, weight: 400 as const, style: "normal" as const },
    { name: "NotoSans", data: sans, weight: 400 as const, style: "normal" as const },
    { name: "Cormorant", data: serif, weight: 700 as const, style: "normal" as const },
    { name: "Cormorant", data: serifItalic, weight: 700 as const, style: "italic" as const },
  ];
}

/** The portrait as a data URL; a 360px copy, so the card stays light. */
async function portraitDataUrl() {
  const bytes = await readFile(join(process.cwd(), "public/images/og/zev-uhuru-360.jpg"));
  return `data:image/jpeg;base64,${bytes.toString("base64")}`;
}

/** The newest published article's title, for C. Falls back to the registry like every page does. */
async function latestTitle(): Promise<string | null> {
  const all = await getAllAgenticArticles();
  const newest = [...all].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))[0];
  if (!newest) return null;
  return newest.title.length > 64 ? `${newest.title.slice(0, 61).trimEnd()}…` : newest.title;
}

/* ── Shared pieces ─────────────────────────────────────────────────────── */

/** The real wordmark: "esy" in Black Ops One, the "e" in jade. */
function Wordmark({ size, onDark }: { size: number; onDark: boolean }) {
  return (
    <div style={{ display: "flex", fontFamily: "BlackOpsOne", fontSize: size, letterSpacing: "0.03em" }}>
      <span style={{ color: JADE }}>e</span>
      <span style={{ color: onDark ? "rgba(255,255,255,0.92)" : NAVY }}>sy</span>
    </div>
  );
}

/** A serif headline where some words are the jade italic accent, as on the hero.
 *  The renderer lays out inline spans as flex items, so each word is its own
 *  item and the line wraps between words. */
function SerifHeadline({
  words,
  size,
  color,
  accent,
  maxWidth,
}: {
  words: [string, boolean][]; // [word, isAccent]
  size: number;
  color: string;
  accent: string;
  maxWidth: number;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", maxWidth, fontFamily: "Cormorant", fontWeight: 700, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.02em" }}>
      {words.map(([word, isAccent], i) => (
        <span
          key={i}
          style={{
            color: isAccent ? accent : color,
            fontStyle: isAccent ? "italic" : "normal",
            marginRight: "0.22em",
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}

/** "the AI systems that run marketing" style copy → word list with the accent marked by *asterisks*. */
function words(text: string): [string, boolean][] {
  const out: [string, boolean][] = [];
  let accent = false;
  for (const raw of text.split(" ")) {
    const starts = raw.startsWith("*");
    const ends = raw.endsWith("*") || raw.endsWith("*.");
    if (starts) accent = true;
    out.push([raw.replace(/\*/g, ""), accent]);
    if (ends) accent = false;
  }
  return out;
}

/** The small caps label used for "FREE WEEKLY EMAIL" and friends. */
function Label({ children, color, size = 22, spacing = 5 }: { children: string; color: string; size?: number; spacing?: number }) {
  return (
    <div style={{ display: "flex", fontFamily: "NotoSans", fontSize: size, letterSpacing: spacing, color }}>{children}</div>
  );
}

/** The subscribe button: the card's one action, in the site's jade. */
function SubscribeButton({ text, size = 30 }: { text: string; size?: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "16px 30px",
        borderRadius: 14,
        background: JADE,
        color: "#FFFFFF",
        fontFamily: "NotoSans",
        fontSize: size,
      }}
    >
      {text}
    </div>
  );
}

/* ── A · Masthead ──────────────────────────────────────────────────────── */

function Masthead() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: PAPER, padding: "54px 72px 50px" }}>
      {/* Brand row: the wordmark and publication name, the offer on the right. */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Wordmark size={46} onDark={false} />
          <div style={{ display: "flex", marginLeft: 22, paddingLeft: 22, borderLeft: `2px solid rgba(10,37,64,0.18)` }}>
            <Label color={INK_SOFT}>THE MARKETING ENGINEER</Label>
          </div>
        </div>
        <div style={{ display: "flex", padding: "10px 20px", borderRadius: 999, background: "rgba(0,168,150,0.1)", border: `2px solid rgba(0,168,150,0.35)` }}>
          <Label color={JADE_TEXT} size={20}>FREE WEEKLY EMAIL</Label>
        </div>
      </div>

      {/* The hero's promise, word for word. */}
      <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
        <SerifHeadline words={words("Learn to build the AI systems that *run marketing*.")} size={88} color={NAVY} accent={JADE} maxWidth={1040} />
      </div>

      {/* The desks, under a heavy rule like the hero's section index, and the ask. */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `5px solid ${NAVY}`, paddingTop: 24 }}>
        <div style={{ display: "flex" }}>
          {DESKS.map((d) => (
            <div key={d.key} style={{ display: "flex", marginRight: 34, fontFamily: "Cormorant", fontWeight: 700, fontSize: 40, color: NAVY }}>
              {d.name}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", fontFamily: "NotoSans", fontSize: 30, color: JADE_TEXT }}>Subscribe free · esy.com</div>
      </div>
    </div>
  );
}

/* ── B · The Offer ─────────────────────────────────────────────────────── */

const OFFER_POINTS = [
  "One system, built step by step",
  "SEO, agents & AI coding tools",
  "From someone running them in production",
];

function Offer() {
  return (
    <div style={{ display: "flex", width: "100%", height: "100%", position: "relative", background: `linear-gradient(135deg, #061527 0%, ${NAVY} 60%, #0F3460 100%)`, padding: "56px 64px" }}>
      {/* A quiet jade glow behind the offer card. */}
      <div style={{ position: "absolute", top: -200, right: -160, width: 640, height: 640, borderRadius: 640, background: "radial-gradient(circle, rgba(0,168,150,0.16) 0%, rgba(0,168,150,0) 68%)" }} />

      {/* Left: who, the promise, the button. */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 620 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Wordmark size={44} onDark />
          <div style={{ display: "flex", marginLeft: 20, paddingLeft: 20, borderLeft: "2px solid rgba(255,255,255,0.22)" }}>
            <Label color="rgba(45,212,191,0.9)" size={20}>THE MARKETING ENGINEER</Label>
          </div>
        </div>
        <SerifHeadline words={words("One email a week on building the AI systems that *run marketing*.")} size={68} color="#F8FAFC" accent={JADE_BRIGHT} maxWidth={600} />
        <div style={{ display: "flex", alignItems: "center" }}>
          <SubscribeButton text="Subscribe free  →" />
          <div style={{ display: "flex", marginLeft: 22, fontFamily: "NotoSans", fontSize: 28, color: "rgba(255,255,255,0.7)" }}>esy.com</div>
        </div>
      </div>

      {/* Right: what every issue gives you. */}
      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 430, padding: "34px 34px 30px", borderRadius: 22, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}>
          <Label color="rgba(255,255,255,0.6)" size={20}>EVERY ISSUE</Label>
          {OFFER_POINTS.map((point) => (
            <div key={point} style={{ display: "flex", alignItems: "flex-start", marginTop: 22 }}>
              {/* Drawn, not typed: the card's sans font has no ✓ glyph. */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 34, background: "rgba(0,212,170,0.16)", marginRight: 16, marginTop: 2, flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={JADE_BRIGHT} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </div>
              <div style={{ display: "flex", fontFamily: "NotoSans", fontSize: 28, lineHeight: 1.3, color: "rgba(255,255,255,0.92)" }}>{point}</div>
            </div>
          ))}
          <div style={{ display: "flex", marginTop: 26, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.12)", fontFamily: "NotoSans", fontSize: 22, color: "rgba(255,255,255,0.6)" }}>
            Free. Unsubscribe anytime.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── C · The Author ────────────────────────────────────────────────────── */

function Author({ portrait, latest }: { portrait: string; latest: string | null }) {
  return (
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#F8F9FA", padding: "56px 70px" }}>
      {/* The person: a big portrait in a jade ring, the name under it. */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 330, marginRight: 56 }}>
        <div style={{ display: "flex", width: 300, height: 300, borderRadius: 300, padding: 7, background: `linear-gradient(135deg, ${JADE_BRIGHT}, ${JADE})` }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img only */}
          <img src={portrait} width={286} height={286} alt="" style={{ borderRadius: 286, objectFit: "cover", border: "6px solid #F8F9FA" }} />
        </div>
        <div style={{ display: "flex", marginTop: 22, fontFamily: "Cormorant", fontWeight: 700, fontSize: 40, color: NAVY }}>Zev Uhuru</div>
        <div style={{ display: "flex", marginTop: 2 }}>
          <Wordmark size={30} onDark={false} />
        </div>
      </div>

      {/* The promise in his voice, the newest issue, the ask. */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
        <Label color={JADE_TEXT} size={19} spacing={3}>THE MARKETING ENGINEER · FREE WEEKLY EMAIL</Label>
        <SerifHeadline words={words("I build AI marketing systems in production, and *show you how*.")} size={70} color={NAVY} accent={JADE} maxWidth={700} />
        {latest && (
          <div style={{ display: "flex", flexDirection: "column", padding: "16px 22px", borderRadius: 14, background: "#FFFFFF", border: "1px solid rgba(10,37,64,0.1)" }}>
            <div style={{ display: "flex", fontFamily: "NotoSans", fontSize: 18, letterSpacing: 4, color: INK_SOFT }}>LATEST</div>
            <div style={{ display: "flex", marginTop: 4, fontFamily: "NotoSans", fontSize: 27, color: INK }}>{latest}</div>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center" }}>
          <SubscribeButton text="Subscribe free at esy.com" size={28} />
        </div>
      </div>
    </div>
  );
}

/** Render one direction as a 1200×630 PNG. */
export async function renderNewsletterCard(variant: Variant) {
  const [fonts, portrait, latest] = await Promise.all([
    loadFonts(),
    variant === "author" ? portraitDataUrl() : Promise.resolve(""),
    variant === "author" ? latestTitle() : Promise.resolve(null),
  ]);
  const card =
    variant === "masthead" ? <Masthead /> : variant === "offer" ? <Offer /> : <Author portrait={portrait} latest={latest} />;
  return new ImageResponse(card, { ...OG_SIZE, fonts });
}
