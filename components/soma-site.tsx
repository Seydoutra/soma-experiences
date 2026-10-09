"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import type { Lang } from "./soma/data";
import { Footer, Header, WhatsAppFab } from "./soma/chrome";
import { Cursor, EASE, ScrollProgress, SmoothScroll, scrollToTop } from "./soma/motion";
import Home from "./soma/home";
import VibesSite from "./vibes-site";
import { AboutPage, BookingPage, ContactPage, FaqPage, GalleryPage, JournalPage, ProjectsPage, ServicesPage, ShopPage, WorldDetail, WorldsPage } from "./soma/pages";

export default function SomaSite() {
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const relative = basePath && pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname;
  const parts = relative.split("/").filter(Boolean);
  const lang: Lang = parts[0] === "en" ? "en" : "fr";
  const page = parts[1] || "home";
  const detail = parts[2] || "";

  useEffect(() => { scrollToTop(); }, [pathname]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  if (page === "vibes") return <VibesSite lang={lang} sub={detail} detail={parts[3] || ""} pathname={pathname} />;

  const view = (() => {
    switch (page) {
      case "about": return <AboutPage lang={lang} />;
      case "services": return <ServicesPage lang={lang} />;
      case "univers": return detail ? <WorldDetail lang={lang} slug={detail} /> : <WorldsPage lang={lang} />;
      case "realisations": return <ProjectsPage lang={lang} slug={detail} />;
      case "galerie": return <GalleryPage lang={lang} />;
      case "blog": return <JournalPage lang={lang} slug={detail} />;
      case "boutique": return <ShopPage lang={lang} />;
      case "faq": return <FaqPage lang={lang} />;
      case "contact": return <ContactPage lang={lang} />;
      case "reservation": return <BookingPage lang={lang} />;
      default: return <Home lang={lang} />;
    }
  })();

  return (
    <div className={`site page-${page}`}>
      <SmoothScroll />
      <ScrollProgress />
      <Cursor label={lang === "fr" ? "Voir" : "View"} />
      <Header lang={lang} page={page} detail={detail} />
      <motion.main key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: EASE }}>
        {view}
      </motion.main>
      {page !== "reservation" && <Footer lang={lang} />}
      <WhatsAppFab lang={lang} />
    </div>
  );
}
