"use client"
import { usePathname } from 'next/navigation';
import Footer from "@/components/Home/footer";
import FooterWorld from "@/components/FooterWorld/FooterWorld";
import CopyrightFooter from "@/components/CopyrightFooter";
import FooterVariant, { FOOTER_VARIANTS } from "@/components/FooterProto/FooterVariant";

const ConditionalFooter = () => {
  const pathname = usePathname();
  
  // Handle both trailing slash (production) and no trailing slash (development) cases
  const normalizedPath = pathname?.endsWith('/') && pathname.length > 1 
    ? pathname.slice(0, -1) 
    : pathname;
  
  // Check if we're on an essay view page (individual essay page)
  // Only hide on individual essay pages, not the essays index page
  const isEssayViewPage = normalizedPath?.startsWith('/essays/') && normalizedPath !== '/essays';
  
  // Don't render the common footer on essay view pages for a focused reading experience
  if (isEssayViewPage) {
    return null;
  }
  
  // Individual infographic detail pages use their own artifact wrapper
  const isInfographicViewPage = normalizedPath?.startsWith('/infographics/') && normalizedPath !== '/infographics';
  if (isInfographicViewPage) {
    return null;
  }

  // Individual clip-art detail pages use their own artifact wrapper
  const isClipArtViewPage = normalizedPath?.startsWith('/clip-art/') && normalizedPath !== '/clip-art';
  if (isClipArtViewPage) {
    return null;
  }
  
  // Check if we're on docs pages (they handle their own footer via DocsPageNav)
  const isDocsPage = normalizedPath?.startsWith('/docs');
  if (isDocsPage) {
    return null;
  }
  
  // Check if we're on agents reference pages (they have their own sidebar/CTA)
  const isAgentsPage = normalizedPath?.startsWith('/ai-agents');
  if (isAgentsPage) {
    return null;
  }
  
  // Check if we're on scrollytelling story pages (individual stories, not index)
  // These pages have their own footer via ScrollytellingTheatreBar
  const isScrollytellingStoryPage = normalizedPath?.startsWith('/scrollytelling/') && normalizedPath !== '/scrollytelling';
  if (isScrollytellingStoryPage) {
    return null;
  }
  
  // Check if we're on the photo-essays landing page (immersive experience with own footer)
  const isPhotoEssaysPage = normalizedPath === '/photo-essays';
  if (isPhotoEssaysPage) {
    return null;
  }
  
  // The films index ends on "Fin." and each film page on its own footer (the
  // live page and prototype A: end credits; prototype B: the last letter).
  const isFilmsPage = normalizedPath === '/films' || normalizedPath?.startsWith('/films/');
  if (isFilmsPage || normalizedPath === '/prototypes/films/a-film' || normalizedPath === '/prototypes/films/b-film') {
    return null;
  }

  // The footer prototypes put the direction under test in the footer's own
  // slot, over the same factory scene (/prototypes/footer/<variant>/).
  const footerProto = normalizedPath?.match(/^\/prototypes\/footer\/([^/]+)$/);
  if (footerProto && FOOTER_VARIANTS.includes(footerProto[1])) {
    return (
      <>
        <FooterWorld />
        <FooterVariant variant={footerProto[1]} />
      </>
    );
  }

  // Course lesson pages used to drop the footer for a focused player; since
  // 2026-09-29 they're publication pages (LessonPage H) and keep it.

  // Render the common footer on all other pages (including homepage). The
  // world rides with it: the footer is a card floating over the factory
  // scene, sitewide. Pages that return null above (docs, agents, essays,
  // artifact detail, scrollytelling, photo essays, course lessons) get
  // neither, which is what "no footer" has always meant here.
  return (
    <>
      <FooterWorld />
      <Footer />
    </>
  );
};

export default ConditionalFooter; 