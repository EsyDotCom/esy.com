import { Geist, Geist_Mono, Newsreader, Inter, Literata, ZCOOL_XiaoWei, Noto_Serif_JP, Black_Ops_One } from "next/font/google";
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
});

const zcoolXiaowei = ZCOOL_XiaoWei({
  variable: "--font-zcool-xiaowei",
  subsets: ["latin"],
  weight: "400",
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const blackOpsOne = Black_Ops_One({
  variable: "--font-black-ops-one",
  subsets: ["latin"],
  weight: "400",
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
