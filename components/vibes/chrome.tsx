"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { IMG, type Lang, tx, waLink } from "../soma/data";
import { L, href } from "../soma/chrome";
import { EventMenuLink, HeaderTickets } from "../soma/event";
import { EASE, Reveal, SplitWords } from "../soma/motion";
import { VIBES_CONTACT, VIBES_NAV, VIBES_SOCIAL, vpath } from "./data";

const fr = (lang: Lang, a: string, b: string) => (lang === "fr" ? a : b);

export function Wordmark({ small }: { small?: boolean }) {
  return <span className={`vibes-wordmark ${small ? "small" : ""}`}><strong>VIBES</strong><em>by SŌMA</em></span>;
}

export function VibesHeader({ lang, sub, detail }: { lang: Lang; sub: string; detail: string }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 240 && !open);
    setScrolled(v > 24);
  });
  useEffect(() => { document.documentElement.style.overflow = open ? "hidden" : ""; }, [open]);
  const other: Lang = lang === "fr" ? "en" : "fr";
  const langHref = href(other, vpath([sub, detail].filter(Boolean).join("/")));
  return (
    <>
      <motion.header className={`header ${scrolled ? "scrolled" : ""}`} animate={{ y: hidden ? -110 : 0 }} transition={{ duration: 0.45, ease: EASE }}>
        <div className="header-inner">
          <L lang={lang} to={vpath()} className="brand vibes-brand" aria-label="VIBES by SŌMA"><Wordmark /></L>
          <nav className="desktop-nav">
            {VIBES_NAV.map((n) => (
              <L key={n.slug} lang={lang} to={vpath(n.slug)} className={sub === n.slug ? "active" : ""}>{tx(lang, n.label)}</L>
            ))}
          </nav>
          <div className="header-actions">
            <HeaderTickets lang={lang} />
            <L lang={lang} to="" className="group-link"><img src={IMG.mark} alt="" />SŌMA Experiences</L>
            <Link className="lang" href={langHref}>{lang === "fr" ? "EN" : "FR"}</Link>
            <button className="menu-toggle" onClick={() => setOpen(true)} aria-label="Menu"><Menu /></button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ clipPath: "circle(0% at 92% 4%)" }} animate={{ clipPath: "circle(150% at 92% 4%)" }} exit={{ clipPath: "circle(0% at 92% 4%)" }} transition={{ duration: 0.7, ease: EASE }}>
            <div className="mobile-menu-top">
              <Wordmark />
              <button onClick={() => setOpen(false)} aria-label={fr(lang, "Fermer", "Close")}><X /></button>
            </div>
            <EventMenuLink lang={lang} onClick={() => setOpen(false)} />
            <nav>
              {[{ slug: "", label: { fr: "Accueil VIBES", en: "VIBES home" } }, ...VIBES_NAV].map((n, i) => (
                <motion.div key={n.slug} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.04, duration: 0.6, ease: EASE }}>
                  <Link href={href(lang, vpath(n.slug))} onClick={() => setOpen(false)}><small>{String(i + 1).padStart(2, "0")}</small>{tx(lang, n.label)}<ArrowUpRight /></Link>
                </motion.div>
              ))}
            </nav>
            <div className="mobile-menu-foot">
              <Link href={langHref} onClick={() => setOpen(false)}>FR / EN</Link>
              <Link href={href(lang)} className="group-link" onClick={() => setOpen(false)}><img src={IMG.mark} alt="" />SŌMA Experiences</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Inner page hero with VIBES breadcrumbs. */
export function VibesPageHero({ lang, label, title, intro, image, crumbs = [] }: { lang: Lang; label: string; title: string; intro?: string; image?: string; crumbs?: { to: string; label: string }[] }) {
  return (
    <section className={`page-hero ${image ? "with-image" : ""}`}>
      <div className="hero-glow" />
      <div className="vibes-sun" aria-hidden />
      <div className="container page-hero-inner">
        <motion.nav className="crumbs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <L lang={lang} to={vpath()}>VIBES</L>
          {crumbs.map((c) => <span key={c.to}><i>/</i><L lang={lang} to={vpath(c.to)}>{c.label}</L></span>)}
          <span><i>/</i>{label}</span>
        </motion.nav>
        <SplitWords as="h1" immediate delay={0.1} text={title} />
        {intro && <motion.p className="lede" initial={{ opacity: 0, y: 14, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.5, duration: 0.9, ease: EASE }}>{intro}</motion.p>}
      </div>
      {image && (
        <motion.div className="container page-hero-media" initial={{ opacity: 0, y: 50, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.35, duration: 1.2, ease: EASE }}>
          <div className="parallax"><img src={image} alt="" /></div>
        </motion.div>
      )}
    </section>
  );
}

export function VibesFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="footer-grid">
        <Reveal className="footer-brand">
          <Wordmark />
          <p className="footer-tagline">{lang === "fr" ? <>La musique, le style <em>et le partage.</em></> : <>Music, style <em>and sharing.</em></>}</p>
          <L lang={lang} to="" className="group-card">
            <img src={IMG.mark} alt="" />
            <span><small>{fr(lang, "Une maison", "A house of")}</small>SŌMA Experiences</span>
            <ArrowUpRight />
          </L>
        </Reveal>
        <Reveal className="footer-col" delay={0.05}>
          <p>VIBES</p>
          <L lang={lang} to={vpath()}>{fr(lang, "Accueil", "Home")}</L>
          {VIBES_NAV.map((n) => <L key={n.slug} lang={lang} to={vpath(n.slug)}>{tx(lang, n.label)}</L>)}
        </Reveal>
        <Reveal className="footer-col" delay={0.1}>
          <p>{fr(lang, "Le groupe", "The group")}</p>
          <L lang={lang} to="">SŌMA Experiences</L>
          <L lang={lang} to="univers">{fr(lang, "Les univers", "The worlds")}</L>
          <L lang={lang} to="services">Services</L>
          <L lang={lang} to="realisations">{fr(lang, "Réalisations", "Work")}</L>
          <L lang={lang} to="about">{fr(lang, "À propos", "About")}</L>
        </Reveal>
        <Reveal className="footer-col" delay={0.15}>
          <p>Contact</p>
          <a href={`mailto:${VIBES_CONTACT.email}`}>{VIBES_CONTACT.email}</a>
          <a href={waLink(fr(lang, "Bonjour VIBES by SŌMA !", "Hello VIBES by SŌMA!"))} target="_blank" rel="noreferrer">{VIBES_CONTACT.phone}</a>
          <span>{tx(lang, VIBES_CONTACT.city)}</span>
          <a href={VIBES_SOCIAL.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={VIBES_SOCIAL.tiktok} target="_blank" rel="noreferrer">TikTok</a>
        </Reveal>
      </div>
      <div className="footer-word" aria-hidden><span>VIBES</span></div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} VIBES by SŌMA</span>
        <span>{fr(lang, "Une maison SŌMA Experiences · Conakry", "A SŌMA Experiences house · Conakry")}</span>
        <L lang={lang} to="">{fr(lang, "Retour au groupe", "Back to the group")}</L>
      </div>
    </footer>
  );
}
