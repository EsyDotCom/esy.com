// Fonts are self-hosted from src/fonts/ (scripts/fetch-google-fonts.py), so builds never fetch from Google.
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Home/navigation";
import Footer from "@/components/Home/footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager, { GoogleTagManagerBody } from "@/components/GoogleTagManager";
import MicrosoftClarity from "@/components/MicrosoftClarity";
import EsyCookieNotice from "@/components/CookieNotice";
import ConditionalNavigation from "@/components/ConditionalNavigation";
import ConditionalFooter from "@/components/ConditionalFooter";
import { HeaderSearchProvider } from "@/contexts/HeaderSearchContext";

const geistSans = localFont({
  src: [
    { path: "../fonts/geist/geist-100-900-normal.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: [
    { path: "../fonts/geist-mono/geist-mono-100-900-normal.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-geist-mono",
});

const newsreader = localFont({
  src: [
    { path: "../fonts/newsreader/newsreader-200-800-normal.woff2", weight: "200 800", style: "normal" },
  ],
  variable: "--font-newsreader",
  adjustFontFallback: "Times New Roman",
});

const inter = localFont({
  src: [
    { path: "../fonts/inter/inter-100-900-normal.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-inter",
});

const literata = localFont({
  src: [
    { path: "../fonts/literata/literata-200-900-normal.woff2", weight: "200 900", style: "normal" },
  ],
  variable: "--font-literata",
  adjustFontFallback: "Times New Roman",
});

const zcoolXiaowei = localFont({
  src: [
    { path: "../fonts/zcool-xiaowei/zcool-xiaowei-400-normal.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-zcool-xiaowei",
  adjustFontFallback: "Times New Roman",
});

const notoSerifJP = localFont({
  src: [
    { path: "../fonts/noto-serif-jp/noto-serif-jp-200-900-normal.woff2", weight: "200 900", style: "normal" },
  ],
  variable: "--font-noto-serif-jp",
  adjustFontFallback: "Times New Roman",
});

const blackOpsOne = localFont({
  src: [
    { path: "../fonts/black-ops-one/black-ops-one-400-normal.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-black-ops-one",
});

// Check if QA environment (set via NEXT_PUBLIC_IS_QA=true)
const isQA = process.env.NEXT_PUBLIC_IS_QA === 'true';

// Site-wide defaults for pages that don't set their own. esy.com is The
// Marketing Engineer first (2026-09-13); the product-era defaults were
// "Esy — Automate & Audit. Agentic Workflows." / "Put marketing production on
// autopilot with ESY…" if the archived homepage is ever restored.
const DEFAULT_TITLE = 'Esy — The Marketing Engineer';
const DEFAULT_DESCRIPTION =
  'The Marketing Engineer: systems that turn marketing data into actions, built on live sites, explained step by step, and measured.';

export const metadata = {
  title: {
    template: '%s | Esy',
    default: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: 'The Marketing Engineer, marketing engineering, Claude Code for marketing, AI marketing systems, marketing automation, SEO automation, agentic workflows',
  metadataBase: new URL('https://esy.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: 'https://esy.com',
    siteName: 'Esy',
    locale: 'en_US',
    type: 'website',
  },
  // Block crawlers and AI bots on QA environment
  ...(isQA && {
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'none',
        'max-snippet': -1,
      },
    },
  }),
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
        <GoogleTagManager />
        <MicrosoftClarity />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${inter.variable} ${literata.variable} ${zcoolXiaowei.variable} ${notoSerifJP.variable} ${blackOpsOne.variable} antialiased`}
      >
        <GoogleTagManagerBody />
        <HeaderSearchProvider>
          <ConditionalNavigation />
          <main>
            {children}
          </main>
          <ConditionalFooter />
        </HeaderSearchProvider>
        <EsyCookieNotice />
      </body>
    </html>
  );
}
