"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Camera, Check, Clapperboard, GlassWater, Lightbulb, Megaphone, Minus, Plus, Sparkles, Star } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "motion/react";
import { CONTACT, FAQ, IMG, OFFERS, POSTS, PROJECTS, SERVICES, STEPS, TESTIMONIALS, WORLDS, type Lang, tx, waLink } from "./data";
import { Btn, Eyebrow, L } from "./chrome";
import { EventChip, EventSpotlight } from "./event";
import { Counter, EASE, Marquee, ParallaxImage, Reveal, ScrollHighlight, SplitWords, Spotlight } from "./motion";

const fr = (lang: Lang, a: string, b: string) => (lang === "fr" ? a : b);

export default function Home({ lang }: { lang: Lang }) {
  return (
    <>
      <Hero lang={lang} />
      <Ticker lang={lang} />
      <EventSpotlight lang={lang} />
      <About lang={lang} />
      <ServicesBento lang={lang} />
      <WorldsStack lang={lang} />
      <Process lang={lang} />
      <WorkRail lang={lang} />
      <Testimonials lang={lang} />
      <Offers lang={lang} />
      <FaqSection lang={lang} />
      <JournalStrip lang={lang} />
      <FinalCta lang={lang} />
    </>
  );
}

/* ---------------------------------------------------------------- Hero */
const HERO_SLIDES = [IMG.hero, IMG.performance, IMG.toast, IMG.foam];

export function Hero({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [reduce ? 0 : 22, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [reduce ? 1 : 0.88, 1]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const [slide, setSlide] = useState(0);
  useEffect(() => { const id = setInterval(() => setSlide((v) => (v + 1) % HERO_SLIDES.length), 4800); return () => clearInterval(id); }, []);

  return (
    <section ref={ref} className="hero">
      <motion.div className="hero-glow" style={{ y: glowY }} />
      <div className="hero-grid" />
      <div className="hero-copy">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
          <EventChip lang={lang} />
        </motion.div>
        <SplitWords as="h1" immediate delay={0.15} className="hero-title" text={fr(lang, "Transformer chaque idée en *expérience.*", "Turning every idea into an *experience.*")} />
        <motion.p className="hero-intro" initial={{ opacity: 0, y: 16, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.75, duration: 0.9, ease: EASE }}>
          {fr(lang, "SŌMA imagine, conçoit et produit des expériences élégantes, immersives et profondément personnalisées — événements, concepts signature, bar et image.", "SŌMA imagines, designs and produces elegant, immersive and deeply personal experiences — events, signature concepts, bar and image.")}
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.9, ease: EASE }}>
          <Btn lang={lang} to="reservation">{fr(lang, "Réserver une consultation", "Book a consultation")}</Btn>
          <Btn lang={lang} to="realisations" variant="ghost">{fr(lang, "Voir nos réalisations", "See our work")}</Btn>
        </motion.div>
        <motion.div className="hero-proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}>
          <div className="avatars">{[IMG.portraitWhite, IMG.editorial, IMG.fashionClose, IMG.portraitBlack].map((s) => <img key={s} src={s} alt="" />)}</div>
          <div><span className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}</span><small>{fr(lang, "+40 expériences imaginées à Conakry", "40+ experiences imagined in Conakry")}</small></div>
        </motion.div>
      </div>

      <div className="hero-stage">
        <motion.div className="hero-media" style={{ rotateX, scale }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.2, ease: EASE }}>
          <AnimatePresence mode="sync">
            <motion.img key={HERO_SLIDES[slide]} src={HERO_SLIDES[slide]} alt={fr(lang, "Une expérience SŌMA à Conakry", "A SŌMA experience in Conakry")} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.4, ease: EASE }} />
          </AnimatePresence>
          <div className="hero-media-shade" />
          <div className="float-card fc-1"><span className="fc-icon"><Sparkles /></span><div><strong>{fr(lang, "Direction artistique", "Creative direction")}</strong><small>{fr(lang, "Concept · Scénographie", "Concept · Staging")}</small></div></div>
          <div className="float-card fc-2"><span className="fc-icon green"><GlassWater /></span><div><strong>SŌMA Bar</strong><small>{fr(lang, "Mixologie sur mesure", "Bespoke mixology")}</small></div></div>
          <div className="float-card fc-3"><strong className="big"><Counter value={100} suffix="%" /></strong><small>{fr(lang, "sur mesure", "bespoke")}</small></div>
          <div className="hero-dots">{HERO_SLIDES.map((_, i) => <button key={i} className={i === slide ? "active" : ""} onClick={() => setSlide(i)} aria-label={`${i + 1}`}><i /></button>)}</div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Ticker */
function Ticker({ lang }: { lang: Lang }) {
  const words = lang === "fr"
    ? ["Événements privés", "Corporate", "Activations de marque", "Mixologie", "Direction artistique", "Photographie", "Concepts signature", "Scénographie"]
    : ["Private events", "Corporate", "Brand activations", "Mixology", "Creative direction", "Photography", "Signature concepts", "Staging"];
  return (
    <section className="ticker">
      <p className="ticker-label">{fr(lang, "Une maison, cinq univers", "One house, five worlds")}</p>
      <Marquee speed={38}>{WORLDS.map((w) => <span key={w.slug} className="ticker-world"><img src={IMG.mark} alt="" />{w.name}</span>)}</Marquee>
      <Marquee speed={52} reverse className="ticker-small">{words.map((w) => <span key={w}>{w}<Sparkles /></span>)}</Marquee>
    </section>
  );
}

/* --------------------------------------------------------------- About */
function About({ lang }: { lang: Lang }) {
  return (
    <section className="about section">
      <div className="container">
        <div className="about-top">
          <Reveal><Eyebrow>{fr(lang, "À propos de SŌMA", "About SŌMA")}</Eyebrow></Reveal>
          <ScrollHighlight className="about-statement" text={fr(lang,
            "SŌMA est une maison créative née à Conakry. Nous ne créons pas simplement des événements : nous imaginons des *expériences* où l’espace, la lumière, le rythme et l’hospitalité racontent une seule histoire.",
            "SŌMA is a creative house born in Conakry. We do not simply create events: we imagine *experiences* where space, light, rhythm and hospitality tell one single story.")} />
        </div>
        <div className="about-grid">
          <Reveal className="about-founder">
            <ParallaxImage src={IMG.fashionClose} alt={fr(lang, "Direction créative SŌMA", "SŌMA creative direction")} />
            <div className="founder-tag"><strong>Catherine Soumah</strong><span>{fr(lang, "Fondatrice & Directrice Créative", "Founder & Creative Director")}</span></div>
          </Reveal>
          <div className="about-side">
            <Reveal className="about-quote">
              <p>“{fr(lang, "Un événement réussi ne se résume jamais à ce que l’on voit. Il se mesure à ce que chacun emporte en mémoire.", "A successful event is never limited to what can be seen. It is measured by what every guest remembers.")}”</p>
              <L lang={lang} to="about" className="link-arrow">{fr(lang, "Découvrir la maison", "Discover the house")}<ArrowUpRight /></L>
            </Reveal>
            <div className="stats">
              {[
                [40, "+", fr(lang, "expériences imaginées", "experiences imagined")],
                [6, "", fr(lang, "années de création", "years creating")],
                [5, "", fr(lang, "univers autonomes", "independent worlds")],
                [100, "%", fr(lang, "sur mesure", "bespoke")],
              ].map(([v, s, l], i) => (
                <Reveal key={String(l)} className="stat" delay={i * 0.08}>
                  <strong><Counter value={Number(v)} suffix={String(s)} /></strong><span>{l}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Services bento */
function ServicesBento({ lang }: { lang: Lang }) {
  const checklist = lang === "fr" ? ["Lieu confirmé", "Moodboard validé", "Prestataires briefés", "Run-of-show prêt"] : ["Venue confirmed", "Moodboard approved", "Suppliers briefed", "Run-of-show ready"];
  const [checked, setChecked] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let id: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !id) id = setInterval(() => setChecked((c) => (c + 1) % (checklist.length + 2)), 900);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); if (id) clearInterval(id); };
  }, [checklist.length]);

  return (
    <section className="services section">
      <div className="container">
        <div className="section-head center">
          <Reveal><Eyebrow>{fr(lang, "Expertise", "Expertise")}</Eyebrow></Reveal>
          <SplitWords text={fr(lang, "Ce que nous *faisons.*", "What we *do.*")} />
          <Reveal delay={0.15}><p className="lede">{fr(lang, "Un accompagnement complet ou ciblé : chaque compétence de la maison peut être activée selon votre projet.", "End-to-end or targeted support: every skill in the house can be activated for your project.")}</p></Reveal>
        </div>
        <div className="bento">
          <Reveal className="b-1"><Spotlight className="bento-card image-card">
            <img src={SERVICES[0].image} alt="" loading="lazy" />
            <div className="bento-copy"><span className="b-icon"><Lightbulb /></span><h3>{tx(lang, SERVICES[0].title)}</h3><p>{tx(lang, SERVICES[0].desc)}</p></div>
          </Spotlight></Reveal>
          <Reveal className="b-2" delay={0.08}><Spotlight className="bento-card">
            <div className="bento-copy"><span className="b-icon"><Check /></span><h3>{tx(lang, SERVICES[2].title)}</h3><p>{tx(lang, SERVICES[2].desc)}</p></div>
            <div className="mini-ui" ref={ref}>
              <div className="mini-head"><span>{fr(lang, "Votre événement", "Your event")}</span><em>{Math.min(checked, checklist.length)}/{checklist.length}</em></div>
              {checklist.map((c, i) => <div key={c} className={`mini-row ${i < checked ? "done" : ""}`}><i><Check /></i>{c}</div>)}
              <div className="mini-bar"><span style={{ width: `${(Math.min(checked, checklist.length) / checklist.length) * 100}%` }} /></div>
            </div>
          </Spotlight></Reveal>
          <Reveal className="b-3" delay={0.05}><Spotlight className="bento-card">
            <div className="bento-copy"><span className="b-icon"><Sparkles /></span><h3>{tx(lang, SERVICES[1].title)}</h3><p>{tx(lang, SERVICES[1].desc)}</p></div>
            <div className="palette">{["#0f0d0a", "#c39a5b", "#e9d3a6", "#2f7a64", "#e0773d"].map((c, i) => <span key={c} style={{ background: c, "--i": i } as CSSProperties} />)}</div>
          </Spotlight></Reveal>
          <Reveal className="b-4" delay={0.1}><Spotlight className="bento-card image-card">
            <img src={SERVICES[5].image} alt="" loading="lazy" />
            <div className="bento-copy"><span className="b-icon"><GlassWater /></span><h3>{tx(lang, SERVICES[5].title)}</h3><p>{tx(lang, SERVICES[5].desc)}</p></div>
          </Spotlight></Reveal>
          <Reveal className="b-5" delay={0.05}><Spotlight className="bento-card image-card">
            <img src={SERVICES[3].image} alt="" loading="lazy" />
            <div className="bento-copy"><span className="b-icon"><Clapperboard /></span><h3>{tx(lang, SERVICES[3].title)}</h3><p>{tx(lang, SERVICES[3].desc)}</p></div>
          </Spotlight></Reveal>
          <Reveal className="b-6" delay={0.1}><Spotlight className="bento-card">
            <div className="bento-copy"><span className="b-icon"><Megaphone /></span><h3>{tx(lang, SERVICES[4].title)}</h3><p>{tx(lang, SERVICES[4].desc)}</p></div>
            <div className="chips">{(lang === "fr" ? ["Identité", "Teasing", "Reels", "Affiches", "Presse", "Récap vidéo"] : ["Identity", "Teasers", "Reels", "Posters", "Press", "Recap video"]).map((c, i) => <span key={c} style={{ "--i": i } as CSSProperties}>{c}</span>)}</div>
          </Spotlight></Reveal>
          <Reveal className="b-7" delay={0.15}><Spotlight className="bento-card image-card">
            <img src={SERVICES[6].image} alt="" loading="lazy" />
            <div className="bento-copy"><span className="b-icon"><Camera /></span><h3>{tx(lang, SERVICES[6].title)}</h3><p>{tx(lang, SERVICES[6].desc)}</p></div>
          </Spotlight></Reveal>
        </div>
        <Reveal className="center-cta"><Btn lang={lang} to="services" variant="dark">{fr(lang, "Tous nos services", "All services")}</Btn></Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------- Worlds sticky stack */
export function WorldsStack({ lang, withHead = true }: { lang: Lang; withHead?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section className="worlds section dark">
      <div className="container">
        {withHead && (
          <div className="section-head split">
            <div><Reveal><Eyebrow light>{fr(lang, "Maison SŌMA", "Maison SŌMA")}</Eyebrow></Reveal><SplitWords text={fr(lang, "Cinq univers. *Une signature.*", "Five worlds. *One signature.*")} /></div>
            <Reveal delay={0.1}><p className="lede">{fr(lang, "Chaque univers possède son histoire, ses services et son propre point de contact. Ils partagent la même direction créative.", "Each world has its own story, services and point of contact. They share one creative direction.")}</p></Reveal>
          </div>
        )}
        <div className="stack" ref={ref}>
          {WORLDS.map((w, i) => <WorldCard key={w.slug} lang={lang} i={i} total={WORLDS.length} progress={scrollYProgress} />)}
        </div>
      </div>
    </section>
  );
}
function WorldCard({ lang, i, total, progress }: { lang: Lang; i: number; total: number; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const w = WORLDS[i];
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i) * 0.035]);
  const dim = useTransform(progress, [i / total, (i + 1) / total], [0, i === total - 1 ? 0 : 0.45]);
  return (
    <div className="stack-item" style={{ top: `calc(96px + ${i * 22}px)` }}>
      <motion.div className="world-card" style={{ scale, "--accent": w.color } as unknown as CSSProperties}>
        <div className="world-card-copy">
          <span className="world-index">0{i + 1} / 0{total}</span>
          <h3>{w.name}</h3>
          <p className="world-tag">{tx(lang, w.tag)}</p>
          <p>{tx(lang, w.story)}</p>
          <ul>{w.services[lang].map((s) => <li key={s}><span />{s}</li>)}</ul>
          <L lang={lang} to={`univers/${w.slug}`} className="link-arrow light">{fr(lang, "Explorer l’univers", "Explore the world")}<ArrowUpRight /></L>
        </div>
        <L lang={lang} to={`univers/${w.slug}`} className="world-card-media" data-cursor="view" aria-label={w.name}><img src={w.image} alt={w.name} loading="lazy" /></L>
        <motion.div className="world-dim" style={{ opacity: dim }} />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------- Process */
export function Process({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length))));
  return (
    <section className="process section">
      <div className="container process-grid">
        <div className="process-sticky">
          <Reveal><Eyebrow>{fr(lang, "Notre méthode", "Our method")}</Eyebrow></Reveal>
          <SplitWords text={fr(lang, "De l’intention *à l’émotion.*", "From intention *to emotion.*")} />
          <Reveal delay={0.1}><p className="lede">{fr(lang, "Une méthode claire en cinq temps, pour avancer sereinement et ne rien laisser au hasard.", "A clear five-step method to move forward calmly and leave nothing to chance.")}</p></Reveal>
          <Reveal delay={0.2}><div className="process-visual"><img src={[IMG.editorial, IMG.signage, IMG.bottles, IMG.performance, IMG.crowd][active]} alt="" key={active} /><span>0{active + 1}</span></div></Reveal>
        </div>
        <div className="steps" ref={ref}>
          <div className="steps-line"><motion.span style={{ scaleY: scrollYProgress }} /></div>
          {STEPS.map((s, i) => (
            <div key={i} className={`step ${i <= active ? "on" : ""}`}>
              <span className="step-n">0{i + 1}</span>
              <div><h3>{tx(lang, s.title)}</h3><p>{tx(lang, s.desc)}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------- Work horizontal rail */
function WorkRail({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const measure = () => {
      const isDesk = window.innerWidth > 900;
      setDesktop(isDesk);
      if (trackRef.current) setDist(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 48));
    };
    measure(); window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  return (
    <section ref={ref} className="work dark" style={desktop ? { height: `calc(100vh + ${dist}px)` } : undefined}>
      <div className="work-sticky">
        <div className="container work-head">
          <div><Reveal><Eyebrow light>Portfolio</Eyebrow></Reveal><SplitWords text={fr(lang, "Des idées qui *prennent vie.*", "Ideas that *come alive.*")} /></div>
          <Reveal delay={0.1}><Btn lang={lang} to="realisations" variant="light">{fr(lang, "Toutes les réalisations", "All work")}</Btn></Reveal>
        </div>
        <motion.div className="work-track" ref={trackRef} style={desktop ? { x } : undefined}>
          {PROJECTS.map((p, i) => (
            <L key={p.slug} lang={lang} to={`realisations/${p.slug}`} className="work-card" data-cursor="view">
              <div className="work-img"><img src={p.image} alt={p.name} loading="lazy" /></div>
              <div className="work-meta"><span>0{i + 1}</span><div><h3>{p.name}</h3><p>{tx(lang, p.cat)} · {p.year}</p></div><ArrowUpRight /></div>
            </L>
          ))}
          <L lang={lang} to="galerie" className="work-card work-more">
            <span>{fr(lang, "Galerie", "Gallery")}</span>
            <h3>{fr(lang, "Tous les instants SŌMA", "Every SŌMA moment")}</h3>
            <ArrowUpRight />
          </L>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- Testimonials */
function Testimonials({ lang }: { lang: Lang }) {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const card = (t: (typeof TESTIMONIALS)[number], k: string) => (
    <figure key={k} className="t-card">
      <span className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}</span>
      <blockquote>“{tx(lang, t.q)}”</blockquote>
      <figcaption><img src={t.img} alt="" />{tx(lang, t.by)}</figcaption>
    </figure>
  );
  return (
    <section className="testimonials section">
      <div className="container section-head center">
        <Reveal><Eyebrow>{fr(lang, "Ils l’ont vécu", "They experienced it")}</Eyebrow></Reveal>
        <SplitWords text={fr(lang, "Ce que nos invités *retiennent.*", "What our guests *remember.*")} />
      </div>
      <Marquee speed={60}>{TESTIMONIALS.map((t, i) => card(t, `a${i}`))}</Marquee>
      <Marquee speed={70} reverse>{[...TESTIMONIALS.slice(half), ...TESTIMONIALS.slice(0, half)].map((t, i) => card(t, `b${i}`))}</Marquee>
    </section>
  );
}

/* --------------------------------------------------------------- Offers */
export function Offers({ lang }: { lang: Lang }) {
  return (
    <section className="offers section">
      <div className="container">
        <div className="section-head center">
          <Reveal><Eyebrow>{fr(lang, "Formules", "Packages")}</Eyebrow></Reveal>
          <SplitWords text={fr(lang, "Un accompagnement *à votre mesure.*", "Support *made to measure.*")} />
          <Reveal delay={0.1}><p className="lede">{fr(lang, "Chaque projet est unique : nos formules servent de point de départ, le devis est toujours personnalisé.", "Every project is unique: our packages are a starting point, every quote is personalised.")}</p></Reveal>
        </div>
        <div className="offer-grid">
          {OFFERS.map((o, i) => (
            <Reveal key={o.name} delay={i * 0.08}>
              <Spotlight className={`offer ${o.featured ? "featured" : ""}`}>
                <div className="offer-top"><h3>{o.name}</h3><span className="offer-tag">{tx(lang, o.tag)}</span></div>
                <p>{tx(lang, o.desc)}</p>
                <div className="offer-price"><strong>{fr(lang, "Sur devis", "On quote")}</strong><small>{fr(lang, "réponse sous 48 h", "reply within 48h")}</small></div>
                <ul>{o.items[lang].map((it) => <li key={it}><Check />{it}</li>)}</ul>
                <Btn lang={lang} to="reservation" variant={o.featured ? "gold" : "dark"}>{fr(lang, "Démarrer mon projet", "Start my project")}</Btn>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ FAQ */
export function FaqList({ lang, items = FAQ }: { lang: Lang; items?: typeof FAQ }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {items.map((f, i) => (
        <Reveal key={i} delay={i * 0.04} className={`faq-item ${open === i ? "open" : ""}`}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span>{tx(lang, f.q)}</span><i>{open === i ? <Minus /> : <Plus />}</i>
          </button>
          <div className="faq-a"><div><p>{tx(lang, f.a)}</p></div></div>
        </Reveal>
      ))}
    </div>
  );
}
function FaqSection({ lang }: { lang: Lang }) {
  return (
    <section className="faq section">
      <div className="container faq-grid">
        <div>
          <Reveal><Eyebrow>FAQ</Eyebrow></Reveal>
          <SplitWords text={fr(lang, "Avant de *commencer.*", "Before we *begin.*")} />
          <Reveal delay={0.1} className="faq-contact">
            <img src={IMG.mark} alt="" />
            <h3>{fr(lang, "Une autre question ?", "Another question?")}</h3>
            <p>{fr(lang, "Écrivez-nous, nous répondons rapidement.", "Write to us, we answer quickly.")}</p>
            <div className="faq-contact-actions">
              <Btn lang={lang} to={waLink(fr(lang, "Bonjour SŌMA, j’ai une question :", "Hello SŌMA, I have a question:"))} external>WhatsApp</Btn>
              <a className="link-arrow" href={`mailto:${CONTACT.email}`}>Email<ArrowUpRight /></a>
            </div>
          </Reveal>
        </div>
        <FaqList lang={lang} items={FAQ.slice(0, 5)} />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Journal */
export function JournalStrip({ lang }: { lang: Lang }) {
  return (
    <section className="journal section">
      <div className="container">
        <div className="section-head split">
          <div><Reveal><Eyebrow>{fr(lang, "Journal", "Journal")}</Eyebrow></Reveal><SplitWords text={fr(lang, "Idées, coulisses *& inspirations.*", "Ideas, backstage *& inspiration.*")} /></div>
          <Reveal delay={0.1}><Btn lang={lang} to="blog" variant="dark">{fr(lang, "Lire le journal", "Read the journal")}</Btn></Reveal>
        </div>
        <div className="post-grid">
          {POSTS.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <L lang={lang} to={`blog/article-${i + 1}`} className="post-card" data-cursor="view">
                <div className="post-img"><img src={p.image} alt="" loading="lazy" /><span>{tx(lang, p.cat)}</span></div>
                <small>6 min · {fr(lang, "Lecture", "Read")}</small>
                <h3>{tx(lang, p.title)}</h3>
                <p>{tx(lang, p.excerpt)}</p>
              </L>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Final CTA */
export function FinalCta({ lang }: { lang: Lang }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const radius = useTransform(scrollYProgress, [0, 1], [80, 32]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  return (
    <section ref={ref} className="final section">
      <div className="container">
        <motion.div className="final-card" style={{ borderRadius: radius, scale }}>
          <img src={IMG.toast} alt="" loading="lazy" />
          <div className="final-shade" />
          <div className="final-glow" />
          <div className="final-copy">
            <Eyebrow light>{fr(lang, "Une idée en tête ?", "Have an idea in mind?")}</Eyebrow>
            <SplitWords text={fr(lang, "Transformons-la *en expérience.*", "Let’s turn it *into an experience.*")} />
            <p>{fr(lang, "Racontez-nous votre intention. Nous revenons vers vous sous 48 h avec une première direction.", "Tell us your intention. We’ll come back within 48 hours with a first direction.")}</p>
            <div className="hero-actions">
              <Btn lang={lang} to="reservation">{fr(lang, "Réserver une consultation", "Book a consultation")}</Btn>
              <Btn lang={lang} to="contact" variant="ghost">{fr(lang, "Parler à SŌMA", "Talk to SŌMA")}</Btn>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
