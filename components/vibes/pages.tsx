"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, MapPin, Ticket, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { EVENT, IMG, type Lang, tx, waLink } from "../soma/data";
import { Btn, Eyebrow, L } from "../soma/chrome";
import { Countdown, EventChip, EventSpotlight, useEventLive } from "../soma/event";
import { EASE, Marquee, ParallaxImage, Reveal, ScrollHighlight, SplitWords, Spotlight } from "../soma/motion";
import { COLLABS, FORMATS, PILLARS, VIBES_CONTACT, VIBES_EVENTS, VIBES_GALLERY, VIBES_SOCIAL, vpath, type VibesEvent } from "./data";
import { VibesPageHero } from "./chrome";

const fr = (lang: Lang, a: string, b: string) => (lang === "fr" ? a : b);

/* ================================================================ Home */
export function VibesHome({ lang }: { lang: Lang }) {
  return (
    <>
      <VibesHero lang={lang} />
      <VibesTicker lang={lang} />
      <Pillars lang={lang} />
      <EventSpotlight lang={lang} vibesLink={false} />
      <EventsList lang={lang} withHead />
      <GalleryStrip lang={lang} />
      <PartnersCta lang={lang} />
      <GroupBlock lang={lang} />
    </>
  );
}

function VibesHero({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 160]);
  const live = useEventLive();
  return (
    <section className="vibes-hero">
      <motion.div className="vibes-hero-bg" style={{ y }}><img src={IMG.foam} alt="" /></motion.div>
      <div className="vibes-hero-shade" />
      <div className="vibes-sun" aria-hidden />
      <div className="container vibes-hero-copy">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}><EventChip lang={lang} /></motion.div>
        <motion.h1 className="vibes-hero-title" initial={{ opacity: 0, y: 40, filter: "blur(12px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.15, duration: 1.1, ease: EASE }}>
          VIBES<em>by SŌMA</em>
        </motion.h1>
        <motion.p className="vibes-hero-intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease: EASE }}>
          {fr(lang, "Des rendez-vous signature à Conakry, autour de la musique, du style et du partage.", "Signature gatherings in Conakry, around music, style and sharing.")}
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.9, ease: EASE }}>
          {live
            ? <Btn lang={lang} to={EVENT.tickets} external>{fr(lang, `Billets ${EVENT.name}`, `${EVENT.name} tickets`)}</Btn>
            : <Btn lang={lang} to={vpath("evenements")}>{fr(lang, "Nos événements", "Our events")}</Btn>}
          <Btn lang={lang} to={vpath("concept")} variant="ghost">{fr(lang, "Le concept", "The concept")}</Btn>
        </motion.div>
      </div>
    </section>
  );
}

function VibesTicker({ lang }: { lang: Lang }) {
  const words = lang === "fr" ? ["Musique", "Style", "Partage", "Splash & Grill", "Conakry", "Good vibes"] : ["Music", "Style", "Sharing", "Splash & Grill", "Conakry", "Good vibes"];
  return (
    <section className="vibes-ticker">
      <Marquee speed={34}>{words.map((w) => <span key={w}>{w}<i aria-hidden>✺</i></span>)}</Marquee>
    </section>
  );
}

function Pillars({ lang }: { lang: Lang }) {
  return (
    <section className="section">
      <div className="container story">
        <Reveal><Eyebrow>{fr(lang, "L’esprit VIBES", "The VIBES spirit")}</Eyebrow></Reveal>
        <div>
          <ScrollHighlight className="about-statement" text={fr(lang,
            "VIBES by SŌMA est la maison des rendez-vous signature de SŌMA Experiences. Chaque soirée est pensée pour transformer un lieu en *scène sociale,* musicale et visuelle.",
            "VIBES by SŌMA is the home of SŌMA Experiences’ signature gatherings. Every night is designed to turn a venue into a *social,* musical and visual stage.")} />
          <div className="vibes-cards">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title.fr} delay={i * 0.08}>
                <Spotlight className="vibes-card"><span>0{i + 1}</span><h3>{tx(lang, p.title)}</h3><p>{tx(lang, p.desc)}</p></Spotlight>
              </Reveal>
            ))}
          </div>
          <Reveal className="row-actions"><Btn lang={lang} to={vpath("concept")} variant="dark">{fr(lang, "Découvrir le concept", "Discover the concept")}</Btn></Reveal>
        </div>
      </div>
    </section>
  );
}

function EventsList({ lang, withHead }: { lang: Lang; withHead?: boolean }) {
  return (
    <section className="section">
      <div className="container">
        {withHead && (
          <div className="section-head split">
            <div><Reveal><Eyebrow>{fr(lang, "Événements", "Events")}</Eyebrow></Reveal><SplitWords text={fr(lang, "Nos rendez-vous *signature.*", "Our signature *gatherings.*")} /></div>
            <Reveal delay={0.1}><Btn lang={lang} to={vpath("evenements")} variant="dark">{fr(lang, "Tous les événements", "All events")}</Btn></Reveal>
          </div>
        )}
        <div className="vibes-events">
          {VIBES_EVENTS.map((e) => <EventCard key={e.slug} lang={lang} e={e} />)}
          <Reveal delay={0.1}>
            <div className="vibes-event-next">
              <span>{fr(lang, "À venir", "Coming up")}</span>
              <h3>{fr(lang, "Les prochains concepts VIBES s’annonceront ici.", "Upcoming VIBES concepts will be announced here.")}</h3>
              <a className="link-arrow" href={VIBES_SOCIAL.instagram} target="_blank" rel="noreferrer">{fr(lang, "Suivre sur Instagram", "Follow on Instagram")}<ArrowUpRight /></a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function EventCard({ lang, e }: { lang: Lang; e: VibesEvent }) {
  return (
    <Reveal>
      <L lang={lang} to={vpath(`evenements/${e.slug}`)} className="vibes-event-card" data-cursor="view">
        <div className="vibes-event-img"><img src={e.image} alt={`${e.name}, ${e.subtitle}`} loading="lazy" /></div>
        <div className="vibes-event-meta">
          <small>{e.editions.map((x) => x.year).join(" · ")}</small>
          <h3>{e.name} <em>{e.subtitle}</em></h3>
          <p>{tx(lang, e.intro)}</p>
          <span className="link-arrow">{fr(lang, "Voir l’événement", "See the event")}<ArrowUpRight /></span>
        </div>
      </L>
    </Reveal>
  );
}

function GalleryStrip({ lang }: { lang: Lang }) {
  return (
    <section className="section dark vibes-strip">
      <div className="container section-head split">
        <div><Reveal><Eyebrow light>{fr(lang, "Galerie", "Gallery")}</Eyebrow></Reveal><SplitWords text={fr(lang, "L’énergie, *en images.*", "The energy, *in pictures.*")} /></div>
        <Reveal delay={0.1}><Btn lang={lang} to={vpath("galerie")} variant="light">{fr(lang, "Voir la galerie", "See the gallery")}</Btn></Reveal>
      </div>
      <Marquee speed={60}>{VIBES_GALLERY.map((src) => <img key={src} className="strip-img" src={src} alt="" loading="lazy" />)}</Marquee>
    </section>
  );
}

function PartnersCta({ lang }: { lang: Lang }) {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="vibes-cta">
            <img src={IMG.toast} alt="" loading="lazy" />
            <div className="vibes-cta-copy">
              <Eyebrow light>{fr(lang, "Marques & lieux", "Brands & venues")}</Eyebrow>
              <SplitWords text={fr(lang, "Associez votre marque *à VIBES.*", "Bring your brand *to VIBES.*")} />
              <p>{fr(lang, "Visibilité, activation sur place, contenus ou format sur mesure : parlons de ce qui a du sens pour vous.", "Visibility, on-site activation, content or a bespoke format: let’s talk about what makes sense for you.")}</p>
              <div className="hero-actions">
                <Btn lang={lang} to={vpath("partenaires")}>{fr(lang, "Devenir partenaire", "Become a partner")}</Btn>
                <Btn lang={lang} to={vpath("contact")} variant="ghost">{fr(lang, "Nous écrire", "Write to us")}</Btn>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Link back to the parent house. */
export function GroupBlock({ lang }: { lang: Lang }) {
  return (
    <section className="section tight">
      <div className="container">
        <Reveal>
          <L lang={lang} to="" className="vibes-group" data-cursor="view">
            <img src={IMG.mark} alt="" />
            <div>
              <span>{fr(lang, "Une maison SŌMA Experiences", "A SŌMA Experiences house")}</span>
              <h3>{fr(lang, "VIBES fait partie de SŌMA Experiences, maison créative et agence événementielle à Conakry.", "VIBES is part of SŌMA Experiences, a creative house and event agency in Conakry.")}</h3>
            </div>
            <i><ArrowUpRight /></i>
          </L>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================= Concept */
export function ConceptPage({ lang }: { lang: Lang }) {
  return (
    <>
      <VibesPageHero lang={lang} label={fr(lang, "Le concept", "The concept")} title={fr(lang, "Faire d’un lieu *une scène.*", "Turning a venue *into a stage.*")} intro={fr(lang, "VIBES by SŌMA imagine et produit des rendez-vous signature qui rassemblent une génération autour de la musique, du style et du partage.", "VIBES by SŌMA imagines and produces signature gatherings that bring a generation together around music, style and sharing.")} image={IMG.crowd} />
      <section className="section">
        <div className="container story">
          <Reveal><Eyebrow>{fr(lang, "Trois piliers", "Three pillars")}</Eyebrow></Reveal>
          <div>
            <ScrollHighlight className="about-statement" text={fr(lang, "Une soirée VIBES se construit comme un récit : un accueil, une montée en énergie et des moments que l’on a envie de *garder en mémoire.*", "A VIBES night is built like a story: a welcome, a rise in energy and moments people want to *remember.*")} />
            <div className="vibes-cards">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title.fr} delay={i * 0.08}><Spotlight className="vibes-card"><span>0{i + 1}</span><h3>{tx(lang, p.title)}</h3><p>{tx(lang, p.desc)}</p></Spotlight></Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section dark">
        <div className="container">
          <div className="section-head split">
            <div><Reveal><Eyebrow light>{fr(lang, "Ce que fait VIBES", "What VIBES does")}</Eyebrow></Reveal><SplitWords text={fr(lang, "Trois savoir-faire, *une énergie.*", "Three skills, *one energy.*")} /></div>
          </div>
          <div className="vibes-formats">
            {FORMATS.map((f, i) => (
              <Reveal key={f.title.fr} delay={i * 0.08}><Spotlight className="vibes-format"><span>0{i + 1}</span><h3>{tx(lang, f.title)}</h3><p>{tx(lang, f.desc)}</p></Spotlight></Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container story">
          <Reveal><Eyebrow>{fr(lang, "Le groupe", "The group")}</Eyebrow></Reveal>
          <div>
            <ScrollHighlight className="about-statement" text={fr(lang, "VIBES partage la direction créative de *SŌMA Experiences* et s’appuie sur les savoir-faire de la maison : production, hospitalité et image.", "VIBES shares the creative direction of *SŌMA Experiences* and draws on the house’s skills: production, hospitality and image.")} />
            <Reveal className="row-actions">
              <Btn lang={lang} to="" variant="dark">{fr(lang, "Découvrir SŌMA Experiences", "Discover SŌMA Experiences")}</Btn>
              <Btn lang={lang} to="univers" variant="dark">{fr(lang, "Les univers de la maison", "The house’s worlds")}</Btn>
            </Reveal>
          </div>
        </div>
      </section>
      <PartnersCta lang={lang} />
    </>
  );
}

/* ============================================================== Events */
export function EventsPage({ lang, slug }: { lang: Lang; slug: string }) {
  const e = slug ? VIBES_EVENTS.find((x) => x.slug === slug) : undefined;
  if (e) return <EventDetail lang={lang} e={e} />;
  return (
    <>
      <VibesPageHero lang={lang} label={fr(lang, "Événements", "Events")} title={fr(lang, "Nos rendez-vous *signature.*", "Our signature *gatherings.*")} intro={fr(lang, "Les concepts VIBES by SŌMA, leurs éditions passées et les prochaines dates.", "VIBES by SŌMA concepts, their past editions and upcoming dates.")} />
      <EventSpotlight lang={lang} vibesLink={false} />
      <EventsList lang={lang} />
      <GroupBlock lang={lang} />
    </>
  );
}

function EventDetail({ lang, e }: { lang: Lang; e: VibesEvent }) {
  const live = useEventLive();
  const upcoming = e.editions.find((x) => x.status === "upcoming");
  return (
    <>
      <VibesPageHero lang={lang} label={e.name} crumbs={[{ to: "evenements", label: fr(lang, "Événements", "Events") }]} title={`${e.name} *${e.subtitle}.*`} intro={tx(lang, e.intro)} image={e.image} />
      <section className="section">
        <div className="container story">
          <Reveal><Eyebrow>{fr(lang, "Au programme", "On the menu")}</Eyebrow></Reveal>
          <div>
            <div className="vibes-ingredients">{e.ingredients[lang].map((x, i) => <Reveal key={x} delay={i * 0.06}><span>{x}</span></Reveal>)}</div>
            {upcoming && live && (
              <Reveal className="vibes-next-edition">
                <div>
                  <small>{tx(lang, upcoming.n)}</small>
                  <p className="vibes-facts"><span><CalendarDays />{upcoming.date ? tx(lang, upcoming.date) : upcoming.year}</span><span><MapPin />Conakry</span><span><Ticket />Billetfacile</span></p>
                </div>
                <Countdown lang={lang} />
                <div className="row-actions">
                  <Btn lang={lang} to={EVENT.tickets} external>{fr(lang, "Acheter mon billet", "Get my ticket")}</Btn>
                  <Btn lang={lang} to={waLink(fr(lang, `Bonjour VIBES by SŌMA, j’ai une question sur ${e.name}.`, `Hello VIBES by SŌMA, I have a question about ${e.name}.`))} external variant="dark">{fr(lang, "Une question ?", "A question?")}</Btn>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>
      <section className="section tight">
        <div className="container">
          <div className="section-head"><Reveal><Eyebrow>{fr(lang, "Les éditions", "Editions")}</Eyebrow></Reveal></div>
          <div className="vibes-editions">
            {e.editions.map((x, i) => (
              <Reveal key={x.year} delay={i * 0.08}>
                <div className={`vibes-edition ${x.status}`}>
                  {x.image && <img src={x.image} alt="" loading="lazy" />}
                  <div>
                    <span>{x.status === "upcoming" ? fr(lang, "À venir", "Upcoming") : fr(lang, "Passée", "Past")}</span>
                    <h3>{tx(lang, x.n)} <em>{x.year}</em></h3>
                    <p>{tx(lang, x.note)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container shots">{e.gallery.slice(0, 3).map((s, i) => <Reveal key={s} delay={i * 0.08} className={`shot shot-${i}`}><ParallaxImage src={s} alt="" amount={8} /></Reveal>)}</div>
      </section>
      <GroupBlock lang={lang} />
    </>
  );
}

/* ============================================================= Gallery */
export function VibesGalleryPage({ lang }: { lang: Lang }) {
  const [box, setBox] = useState<number | null>(null);
  const n = VIBES_GALLERY.length;
  useEffect(() => {
    if (box === null) return;
    const key = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setBox(null);
      if (ev.key === "ArrowRight") setBox((b) => (b === null ? b : (b + 1) % n));
      if (ev.key === "ArrowLeft") setBox((b) => (b === null ? b : (b - 1 + n) % n));
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [box, n]);
  return (
    <>
      <VibesPageHero lang={lang} label={fr(lang, "Galerie", "Gallery")} title={fr(lang, "L’énergie, *en images.*", "The energy, *in pictures.*")} intro={fr(lang, "Des instants pris pendant les soirées VIBES by SŌMA.", "Moments captured during VIBES by SŌMA nights.")} />
      <section className="section tight vibes-gallery">
        <div className="container masonry">
          {VIBES_GALLERY.map((img, i) => (
            <Reveal key={img} delay={(i % 3) * 0.06}>
              <button onClick={() => setBox(i)} data-cursor="view"><img src={img} alt={`VIBES by SŌMA ${i + 1}`} loading={i > 3 ? "lazy" : "eager"} /><span>{String(i + 1).padStart(2, "0")}</span></button>
            </Reveal>
          ))}
        </div>
      </section>
      <AnimatePresence>
        {box !== null && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="lb-close" onClick={() => setBox(null)} aria-label={fr(lang, "Fermer", "Close")}><X /></button>
            <button className="lb-nav" onClick={() => setBox((box - 1 + n) % n)} aria-label={fr(lang, "Précédente", "Previous")}><ArrowLeft /></button>
            <motion.img key={box} src={VIBES_GALLERY[box]} alt="" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }} />
            <button className="lb-nav" onClick={() => setBox((box + 1) % n)} aria-label={fr(lang, "Suivante", "Next")}><ArrowRight /></button>
            <span className="lb-count">{String(box + 1).padStart(2, "0")} / {n}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================ Partners */
export function PartnersPage({ lang }: { lang: Lang }) {
  return (
    <>
      <VibesPageHero lang={lang} label={fr(lang, "Partenaires", "Partners")} title={fr(lang, "Faire vibrer *votre marque.*", "Make your brand *part of the vibe.*")} intro={fr(lang, "VIBES by SŌMA construit ses soirées avec des marques et des lieux qui partagent son énergie. Chaque collaboration se définit ensemble.", "VIBES by SŌMA builds its nights with brands and venues that share its energy. Each collaboration is defined together.")} image={IMG.bottles} />
      <section className="section">
        <div className="container">
          <div className="section-head split">
            <div><Reveal><Eyebrow>{fr(lang, "Pistes de collaboration", "Ways to collaborate")}</Eyebrow></Reveal><SplitWords text={fr(lang, "Ce que nous pouvons *construire ensemble.*", "What we can *build together.*")} /></div>
            <Reveal delay={0.1}><p className="lede">{fr(lang, "Ces pistes servent de point de départ. Le contenu exact de chaque partenariat se décide avec vous, édition par édition.", "These are starting points. The exact content of each partnership is decided with you, edition by edition.")}</p></Reveal>
          </div>
          <div className="vibes-collabs">
            {COLLABS.map((c, i) => (
              <Reveal key={c.title.fr} delay={i * 0.06}><Spotlight className="vibes-card"><span>0{i + 1}</span><h3>{tx(lang, c.title)}</h3><p>{tx(lang, c.desc)}</p></Spotlight></Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section tight">
        <div className="container"><ContactBlock lang={lang} defaultSubject="partner" /></div>
      </section>
      <GroupBlock lang={lang} />
    </>
  );
}

/* ============================================================= Contact */
export function VibesContactPage({ lang }: { lang: Lang }) {
  return (
    <>
      <VibesPageHero lang={lang} label="Contact" title={fr(lang, "Parlons *vibes.*", "Let’s talk *vibes.*")} intro={fr(lang, "Une question sur un événement, un partenariat ou une privatisation ? Écrivez-nous.", "A question about an event, a partnership or a private booking? Write to us.")} />
      <section className="section"><div className="container"><ContactBlock lang={lang} /></div></section>
      <GroupBlock lang={lang} />
    </>
  );
}

function ContactBlock({ lang, defaultSubject = "event" }: { lang: Lang; defaultSubject?: string }) {
  const [sent, setSent] = useState(false);
  const subjects: [string, string][] = [
    ["event", fr(lang, "Un événement / la billetterie", "An event / tickets")],
    ["partner", fr(lang, "Un partenariat", "A partnership")],
    ["private", fr(lang, "Une privatisation", "A private booking")],
    ["press", fr(lang, "Presse", "Press")],
    ["other", fr(lang, "Autre", "Other")],
  ];
  const submit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const d = Object.fromEntries(new FormData(ev.currentTarget)) as Record<string, string>;
    const subject = subjects.find(([k]) => k === d.subject)?.[1] ?? d.subject;
    const fields = [`${fr(lang, "Nom", "Name")}: ${d.name}`, d.company ? `${fr(lang, "Marque / entreprise", "Brand / company")}: ${d.company}` : "", d.email ? `Email: ${d.email}` : "", `${fr(lang, "Sujet", "Subject")}: ${subject}`].filter(Boolean);
    window.open(waLink(`${fr(lang, "Bonjour VIBES by SŌMA,", "Hello VIBES by SŌMA,")}\n${fields.join("\n")}\n\n${d.message}`), "_blank");
    setSent(true);
  };
  return (
    <div className="contact-grid">
      <Reveal className="contact-cards">
        {[
          ["WhatsApp", VIBES_CONTACT.phone, waLink(fr(lang, "Bonjour VIBES by SŌMA !", "Hello VIBES by SŌMA!"))],
          ["Email", VIBES_CONTACT.email, `mailto:${VIBES_CONTACT.email}`],
          ["Instagram", "@somaexperiences_", VIBES_SOCIAL.instagram],
          [fr(lang, "Ville", "City"), tx(lang, VIBES_CONTACT.city), ""],
        ].map(([k, v, h]) => (
          <Spotlight key={k} className="contact-card">
            <small>{k}</small>
            {h ? <a href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{v}<ArrowUpRight /></a> : <strong>{v}</strong>}
          </Spotlight>
        ))}
      </Reveal>
      <Reveal delay={0.1}>
        <form className="form" onSubmit={submit}>
          <label>{fr(lang, "Nom", "Name")}<input name="name" required /></label>
          <label>{fr(lang, "Marque / entreprise", "Brand / company")}<input name="company" /></label>
          <label>Email<input name="email" type="email" /></label>
          <label>{fr(lang, "Sujet", "Subject")}<select name="subject" defaultValue={defaultSubject}>{subjects.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></label>
          <label className="full">Message<textarea name="message" rows={5} required /></label>
          <button className="btn btn-gold full" type="submit"><span>{sent ? fr(lang, "Message préparé sur WhatsApp", "Message prepared on WhatsApp") : fr(lang, "Envoyer", "Send")}</span><i>{sent ? <><Check /><Check /></> : <><ArrowUpRight /><ArrowUpRight /></>}</i></button>
          <p className="form-note">{fr(lang, "Votre message s’ouvre dans WhatsApp, prêt à être envoyé.", "Your message opens in WhatsApp, ready to send.")}</p>
        </form>
      </Reveal>
    </div>
  );
}

