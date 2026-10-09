"use client";

import { motion } from "motion/react";
import type { Lang } from "./soma/data";
import { WhatsAppFab } from "./soma/chrome";
import { Cursor, EASE, ScrollProgress, SmoothScroll } from "./soma/motion";
import { VibesFooter, VibesHeader } from "./vibes/chrome";
import { ConceptPage, EventsPage, PartnersPage, VibesContactPage, VibesGalleryPage, VibesHome } from "./vibes/pages";

/** VIBES by SŌMA: the subsidiary's own site, served under /{lang}/vibes. */
export default function VibesSite({ lang, sub, detail, pathname }: { lang: Lang; sub: string; detail: string; pathname: string }) {
  const view = (() => {
    switch (sub) {
      case "concept": return <ConceptPage lang={lang} />;
      case "evenements": return <EventsPage lang={lang} slug={detail} />;
      case "galerie": return <VibesGalleryPage lang={lang} />;
      case "partenaires": return <PartnersPage lang={lang} />;
      case "contact": return <VibesContactPage lang={lang} />;
      default: return <VibesHome lang={lang} />;
    }
  })();

  return (
    <div className={`site vibes page-vibes-${sub || "home"}`}>
      <SmoothScroll />
      <ScrollProgress />
      <Cursor label={lang === "fr" ? "Voir" : "View"} />
      <VibesHeader lang={lang} sub={sub} detail={detail} />
      <motion.main key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: EASE }}>
        {view}
      </motion.main>
      <VibesFooter lang={lang} />
      <WhatsAppFab lang={lang} message={lang === "fr" ? "Bonjour VIBES by SŌMA, je souhaite avoir des informations." : "Hello VIBES by SŌMA, I’d like some information."} />
    </div>
  );
}
