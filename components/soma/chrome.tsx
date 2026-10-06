"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { CONTACT, IMG, NAV, type Lang, tx, waLink } from "./data";
import { EASE, Magnetic, Reveal } from "./motion";

export const href = (lang: Lang, path = "") => `/${lang}${path ? `/${path}` : ""}`;

export function L({ lang, to, children, className, ...rest }: { lang: Lang; to: string; children: ReactNode; className?: string; "data-cursor"?: string; "aria-label"?: string }) {
  return <Link href={href(lang, to)} className={className} {...rest}>{children}</Link>;
}

/** Pill button with a sliding arrow. */
export function Btn({ lang, to, children, variant = "gold", external }: { lang: Lang; to: string; children: ReactNode; variant?: "gold" | "ghost" | "dark" | "light"; external?: boolean }) {
  const inner = <><span>{children}</span><i><ArrowUpRight /><ArrowUpRight /></i></>;
  const cls = `btn btn-${variant}`;
  return <Magnetic strength={0.18}>{external ? <a className={cls} href={to} target="_blank" rel="noreferrer">{inner}</a> : <L lang={lang} to={to} className={cls}>{inner}</L>}</Magnetic>;
}

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "light" : ""}`}><span className="eyebrow-dot" />{children}</p>;
}

export function Header({ lang, page, detail }: { lang: Lang; page: string; detail: string }) {
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
  const langHref = href(other, [page === "home" ? "" : page, detail].filter(Boolean).join("/"));
  return (
    <>
      <motion.header className={`header ${scrolled ? "scrolled" : ""}`} animate={{ y: hidden ? -110 : 0 }} transition={{ duration: 0.45, ease: EASE }}>
        <div className="header-inner">
          <L lang={lang} to="" className="brand" aria-label="SŌMA Experiences">
            <img src={IMG.mark} alt="" />
            <span>SŌMA<small>EXPERIENCES</small></span>
          </L>
          <nav className="desktop-nav">
            {NAV.slice(0, 6).map((n) => (
              <L key={n.slug} lang={lang} to={n.slug} className={page === n.slug ? "active" : ""}>{tx(lang, n.label)}</L>
            ))}
          </nav>
          <div className="header-actions">
            <Link className="lang" href={langHref}>{lang === "fr" ? "EN" : "FR"}</Link>
            <L lang={lang} to="reservation" className="btn btn-gold btn-sm header-cta"><span>{lang === "fr" ? "Réserver" : "Book"}</span><i><ArrowUpRight /><ArrowUpRight /></i></L>
            <button className="menu-toggle" onClick={() => setOpen(true)} aria-label="Menu"><Menu /></button>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ clipPath: "circle(0% at 92% 4%)" }} animate={{ clipPath: "circle(150% at 92% 4%)" }} exit={{ clipPath: "circle(0% at 92% 4%)" }} transition={{ duration: 0.7, ease: EASE }}>
            <div className="mobile-menu-top">
              <img src={IMG.mark} alt="" />
              <button onClick={() => setOpen(false)} aria-label={lang === "fr" ? "Fermer" : "Close"}><X /></button>
            </div>
            <nav>
              {[{ slug: "", label: { fr: "Accueil", en: "Home" } }, ...NAV].map((n, i) => (
                <motion.div key={n.slug} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.04, duration: 0.6, ease: EASE }}>
                  <Link href={href(lang, n.slug)} onClick={() => setOpen(false)}><small>{String(i + 1).padStart(2, "0")}</small>{tx(lang, n.label)}<ArrowUpRight /></Link>
                </motion.div>
              ))}
            </nav>
            <div className="mobile-menu-foot">
              <Link href={langHref} onClick={() => setOpen(false)}>FR / EN</Link>
              <Link href={href(lang, "reservation")} className="btn btn-gold" onClick={() => setOpen(false)}><span>{lang === "fr" ? "Réserver" : "Book"}</span><i><ArrowUpRight /><ArrowUpRight /></i></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  const [email, setEmail] = useState("");
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="footer-grid">
        <Reveal className="footer-brand">
          <img src={IMG.mark} alt="" />
          <p className="footer-tagline">{lang === "fr" ? <>Chaque détail participe <em>à l’expérience.</em></> : <>Every detail shapes <em>the experience.</em></>}</p>
          <form className="newsletter" onSubmit={(e) => { e.preventDefault(); window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Newsletter SŌMA")}&body=${encodeURIComponent(`${lang === "fr" ? "Merci de m’inscrire à la newsletter" : "Please subscribe me to the newsletter"} : ${email}`)}`; }}>
            <label htmlFor="nl">{lang === "fr" ? "Inspiration, coulisses et prochaines expériences." : "Inspiration, behind the scenes and upcoming experiences."}</label>
            <div><input id="nl" type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><button aria-label={lang === "fr" ? "S’inscrire" : "Subscribe"}><ArrowRight /></button></div>
          </form>
        </Reveal>
        <Reveal className="footer-col" delay={0.05}>
          <p>{lang === "fr" ? "Explorer" : "Explore"}</p>
          {NAV.slice(0, 5).map((n) => <L key={n.slug} lang={lang} to={n.slug}>{tx(lang, n.label)}</L>)}
        </Reveal>
        <Reveal className="footer-col" delay={0.1}>
          <p>{lang === "fr" ? "Maison" : "House"}</p>
          {NAV.slice(5).map((n) => <L key={n.slug} lang={lang} to={n.slug}>{tx(lang, n.label)}</L>)}
          <L lang={lang} to="reservation">{lang === "fr" ? "Réservation" : "Booking"}</L>
        </Reveal>
        <Reveal className="footer-col" delay={0.15}>
          <p>Contact</p>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a href={waLink(lang === "fr" ? "Bonjour SŌMA Experiences !" : "Hello SŌMA Experiences!")} target="_blank" rel="noreferrer">{CONTACT.phone}</a>
          <span>{tx(lang, CONTACT.city)}</span>
        </Reveal>
      </div>
      <div className="footer-word" aria-hidden><span>SŌMA</span></div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} SŌMA Experiences</span>
        <span>{lang === "fr" ? "Maison créative · Conakry" : "Creative house · Conakry"}</span>
        <span>Instagram · TikTok</span>
      </div>
    </footer>
  );
}

export function WhatsAppFab({ lang }: { lang: Lang }) {
  return (
    <a className="whatsapp" href={waLink(lang === "fr" ? "Bonjour SŌMA Experiences, je souhaite obtenir des informations concernant vos services." : "Hello SŌMA Experiences, I’d like some information about your services.")} target="_blank" rel="noreferrer" aria-label="WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.1-1.34A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.03.8.8-2.95-.2-.3a8.2 8.2 0 1 1 6.93 3.78Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.66.31 2.77 2.77 0 0 0-.86 2.06c0 1.21.88 2.38 1 2.55.13.16 1.74 2.66 4.22 3.73 1.57.68 2.18.74 2.97.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.17-.47-.29Z" /></svg>
    </a>
  );
}
