"use client";

import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { CONTACT, FAQ, GALLERY, IMG, POSTS, PRODUCTS, PROJECTS, SERVICES, WORLDS, type Lang, tx, waLink, EVENT } from "./data";
import { Btn, Eyebrow, L } from "./chrome";
import { EASE, Marquee, ParallaxImage, Reveal, ScrollHighlight, SplitWords, Spotlight } from "./motion";
import { FaqList, FinalCta, Offers, Process, WorldsStack } from "./home";
import { EventBanner } from "./event";

const fr = (lang: Lang, a: string, b: string) => (lang === "fr" ? a : b);

export function PageHero({ lang, eyebrow, title, intro, image, crumbs = [] }: { lang: Lang; eyebrow: string; title: string; intro?: string; image?: string; crumbs?: { to: string; label: string }[] }) {
  return (
    <section className={`page-hero ${image ? "with-image" : ""}`}>
      <div className="hero-glow" />
      <div className="hero-grid" />
      <div className="container page-hero-inner">
        <motion.nav className="crumbs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <L lang={lang} to="">{fr(lang, "Accueil", "Home")}</L>
          {crumbs.map((c) => <span key={c.to}><i>/</i><L lang={lang} to={c.to}>{c.label}</L></span>)}
          <span><i>/</i>{eyebrow}</span>
        </motion.nav>
        <SplitWords as="h1" immediate delay={0.1} text={title} />
        {intro && <motion.p className="lede" initial={{ opacity: 0, y: 14, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.5, duration: 0.9, ease: EASE }}>{intro}</motion.p>}
      </div>
      {image && (
        <motion.div className="container page-hero-media" initial={{ opacity: 0, y: 50, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.35, duration: 1.2, ease: EASE }}>
          <ParallaxImage src={image} alt="" amount={8} />
        </motion.div>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------- About */
export function AboutPage({ lang }: { lang: Lang }) {
  const values = lang === "fr" ? ["Créativité", "Élégance", "Confiance", "Proximité", "Fiabilité", "Détail"] : ["Creativity", "Elegance", "Trust", "Closeness", "Reliability", "Detail"];
  return (
    <>
      <PageHero lang={lang} eyebrow={fr(lang, "À propos", "About")} title={fr(lang, "Créer avec intention. *Recevoir avec émotion.*", "Create with intention. *Welcome with emotion.*")} />
      <section className="section">
        <div className="container founder-split">
          <Reveal className="about-founder">
            <ParallaxImage src={IMG.catherine} alt={fr(lang, "Catherine Soumah, fondatrice de SŌMA Experiences", "Catherine Soumah, founder of SŌMA Experiences")} amount={6} />
            <div className="founder-tag"><strong>Catherine Soumah</strong><span>{fr(lang, "Fondatrice & Directrice Créative", "Founder & Creative Director")}</span></div>
          </Reveal>
          <div>
            <Reveal><Eyebrow>{fr(lang, "La vision", "The vision")}</Eyebrow></Reveal>
            <ScrollHighlight className="about-statement" text={fr(lang, "Fondatrice et directrice créative, Catherine Soumah construit SŌMA comme une *maison de création* ancrée à Conakry et connectée au monde.", "Founder and creative director Catherine Soumah is building SŌMA as a *creative house* rooted in Conakry and connected to the world.")} />
            <div className="two-col">
              <Reveal><p>{fr(lang, "Sa pratique réunit stratégie, culture visuelle, hospitalité et rigueur de production. Autour d’elle, SŌMA rassemble création, production et hospitalité dans une seule maison.", "Her practice combines strategy, visual culture, hospitality and production rigour. Around her, SŌMA brings creation, production and hospitality together in one house.")}</p></Reveal>
              <Reveal delay={0.08}><p>{fr(lang, "Pour elle, un événement réussi ne se résume jamais à ce que l’on voit. Il se mesure à la fluidité du parcours, à la qualité des attentions et à ce que chacun emporte en mémoire.", "For her, a successful event is never limited to what can be seen. It is measured by the flow of the journey, the quality of each gesture and what every guest remembers.")}</p></Reveal>
            </div>
          </div>
        </div>
      </section>
      <section className="section dark mv">
        <div className="container mv-grid">
          {[["Mission", fr(lang, "Transformer une intention en une expérience cohérente, esthétique et mémorable.", "Turn an intention into a coherent, beautiful and memorable experience.")], ["Vision", fr(lang, "Faire rayonner depuis Conakry une nouvelle manière de créer, produire et recevoir.", "Build from Conakry a new way to create, produce and host.")]].map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.1}><Spotlight className="mv-card"><Eyebrow light>{k}</Eyebrow><h3>{v}</h3></Spotlight></Reveal>
          ))}
        </div>
        <Marquee speed={30} className="values-marquee">{values.map((v) => <span key={v}>{v}<img src={IMG.mark} alt="" /></span>)}</Marquee>
      </section>
      <WorldsStack lang={lang} />
      <Process lang={lang} />
      <FinalCta lang={lang} />
    </>
  );
}

/* ------------------------------------------------------------- Services */
export function ServicesPage({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHero lang={lang} eyebrow="Services" title={fr(lang, "Du concept *à l’émotion.*", "From concept *to emotion.*")} intro={fr(lang, "Huit expertises, une seule direction créative. Activez-les ensemble ou séparément.", "Eight areas of expertise, one creative direction. Activate them together or separately.")} />
      <section className="section">
        <div className="container service-list">
          {SERVICES.map((s, i) => (
            <Reveal key={i} className="service-row">
              <L lang={lang} to="contact" data-cursor="view">
                <span className="service-n">0{i + 1}</span>
                <h2>{tx(lang, s.title)}</h2>
                <p>{tx(lang, s.desc)}</p>
                {s.image && <div className="service-peek"><img src={s.image} alt="" loading="lazy" /></div>}
                <i><ArrowUpRight /></i>
              </L>
            </Reveal>
          ))}
        </div>
      </section>
      <Process lang={lang} />
      <Offers lang={lang} />
      <FinalCta lang={lang} />
    </>
  );
}

/* --------------------------------------------------------------- Worlds */
export function WorldsPage({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHero lang={lang} eyebrow={fr(lang, "Univers", "Worlds")} title={fr(lang, "Cinq univers. *Une signature.*", "Five worlds. *One signature.*")} intro={fr(lang, "Chaque univers possède son histoire, ses services et son propre point de contact.", "Each world has its own story, services and point of contact.")} />
      <WorldsStack lang={lang} withHead={false} />
      <FinalCta lang={lang} />
    </>
  );
}

export function WorldDetail({ lang, slug }: { lang: Lang; slug: string }) {
  const w = WORLDS.find((x) => x.slug === slug) ?? WORLDS[0];
  const idx = WORLDS.indexOf(w), next = WORLDS[(idx + 1) % WORLDS.length];
  return (
    <div style={{ "--accent": w.color } as CSSProperties}>
      <PageHero lang={lang} eyebrow={w.name} crumbs={[{ to: "univers", label: fr(lang, "Univers", "Worlds") }]} title={`${w.name.split(" ").slice(0, -1).join(" ") || w.name} *${w.name.split(" ").slice(-1)[0]}*`} intro={tx(lang, w.tag)} image={w.image} />
      <section className="section">
        <div className="container story">
          <Reveal><Eyebrow>{fr(lang, "Histoire & positionnement", "Story & positioning")}</Eyebrow></Reveal>
          <div>
            <ScrollHighlight className="about-statement" text={tx(lang, w.story)} />
            <div className="world-services">
              {w.services[lang].map((s, i) => <Reveal key={s} delay={i * 0.08}><Spotlight className="ws-card"><span>0{i + 1}</span><h3>{s}</h3></Spotlight></Reveal>)}
            </div>
            <Reveal className="row-actions">{w.site && <Btn lang={lang} to={w.site}>{fr(lang, `Visiter le site ${w.name}`, `Visit the ${w.name} site`)}</Btn>}{w.slug === "vibes-by-soma" ? <Btn lang={lang} to={EVENT.tickets} external variant="dark">{fr(lang, "Prendre mon pass", "Get my pass")}</Btn> : <Btn lang={lang} to="reservation" variant={w.site ? "dark" : "gold"}>{fr(lang, `Réserver avec ${w.name}`, `Book with ${w.name}`)}</Btn>}<Btn lang={lang} to={waLink(fr(lang, `Bonjour ${w.name}, je souhaite des informations.`, `Hello ${w.name}, I’d like some information.`))} external variant="dark">WhatsApp</Btn></Reveal>
          </div>
        </div>
      </section>
      {w.slug === "vibes-by-soma" && <EventBanner lang={lang} />}
      <section className="section tight">
        <div className="container shots">{w.shots.map((s, i) => <Reveal key={s} delay={i * 0.08} className={`shot shot-${i}`}><ParallaxImage src={s} alt="" amount={8} /></Reveal>)}</div>
      </section>
      <section className="section">
        <div className="container">
          <L lang={lang} to={`univers/${next.slug}`} className="next-link" data-cursor="view">
            <span>{fr(lang, "Univers suivant", "Next world")}</span>
            <h2>{next.name}</h2>
            <i><ArrowRight /></i>
            <img src={next.image} alt="" />
          </L>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------- Projects */
export function ProjectsPage({ lang, slug }: { lang: Lang; slug: string }) {
  if (slug) {
    const p = PROJECTS.find((x) => x.slug === slug) ?? PROJECTS[0];
    const next = PROJECTS[(PROJECTS.indexOf(p) + 1) % PROJECTS.length];
    return (
      <>
        <PageHero lang={lang} eyebrow={p.name} crumbs={[{ to: "realisations", label: fr(lang, "Réalisations", "Work") }]} title={`*${p.name}*`} intro={`${tx(lang, p.cat)} · ${p.year}`} image={p.image} />
        <section className="section">
          <div className="container story">
            <Reveal><Eyebrow>{fr(lang, "Le concept", "The concept")}</Eyebrow></Reveal>
            <div>
              <ScrollHighlight className="about-statement" text={tx(lang, p.brief)} />
              <dl className="case-facts">
                {[[fr(lang, "Catégorie", "Category"), tx(lang, p.cat)], [fr(lang, "Année", "Year"), p.year], [fr(lang, "Lieu", "Location"), "Conakry"], [fr(lang, "Rôle", "Role"), fr(lang, "Concept, direction, production", "Concept, direction, production")]].map(([k, v], i) => <Reveal key={k} delay={i * 0.05}><dt>{k}</dt><dd>{v}</dd></Reveal>)}
              </dl>
            </div>
          </div>
        </section>
        {p.slug === "nomo-vibes" && <EventBanner lang={lang} />}
        {p.slug === "nomo-vibes" && <section className="section tight"><div className="container"><Reveal className="row-actions"><Btn lang={lang} to="vibes/evenements/onomo-vibes" variant="dark">{fr(lang, "Onomo Vibes sur le site VIBES by SŌMA", "Onomo Vibes on the VIBES by SŌMA site")}</Btn></Reveal></div></section>}
        <section className="section tight"><div className="container shots">{p.gallery.map((s, i) => <Reveal key={s} delay={i * 0.08} className={`shot shot-${i}`}><ParallaxImage src={s} alt="" amount={8} /></Reveal>)}</div></section>
        <section className="section"><div className="container"><L lang={lang} to={`realisations/${next.slug}`} className="next-link" data-cursor="view"><span>{fr(lang, "Projet suivant", "Next project")}</span><h2>{next.name}</h2><i><ArrowRight /></i><img src={next.image} alt="" /></L></div></section>
        <FinalCta lang={lang} />
      </>
    );
  }
  return (
    <>
      <PageHero lang={lang} eyebrow={fr(lang, "Réalisations", "Work")} title={fr(lang, "Des idées qui *prennent vie.*", "Ideas that *come alive.*")} intro={fr(lang, "Une sélection d’expériences imaginées et produites par la maison.", "A selection of experiences imagined and produced by the house.")} />
      <section className="section">
        <div className="container portfolio">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.1} className={`pf pf-${i}`}>
              <L lang={lang} to={`realisations/${p.slug}`} className="pf-card" data-cursor="view">
                <div className="pf-img"><img src={p.image} alt={p.name} loading="lazy" /></div>
                <div className="pf-meta"><div><h2>{p.name}</h2><p>{tx(lang, p.cat)}</p></div><span>{p.year}</span></div>
              </L>
            </Reveal>
          ))}
        </div>
      </section>
      <FinalCta lang={lang} />
    </>
  );
}

/* -------------------------------------------------------------- Gallery */
export function GalleryPage({ lang }: { lang: Lang }) {
  const [box, setBox] = useState<number | null>(null);
  useEffect(() => {
    if (box === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBox(null);
      if (e.key === "ArrowRight") setBox((b) => (b === null ? b : (b + 1) % GALLERY.length));
      if (e.key === "ArrowLeft") setBox((b) => (b === null ? b : (b - 1 + GALLERY.length) % GALLERY.length));
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [box]);
  return (
    <>
      <PageHero lang={lang} eyebrow={fr(lang, "Galerie", "Gallery")} title={fr(lang, "Instants *SŌMA.*", "Moments *by SŌMA.*")} />
      <section className="section tight">
        <div className="container masonry">
          {GALLERY.map((img, i) => (
            <Reveal key={img} delay={(i % 3) * 0.06}>
              <button onClick={() => setBox(i)} data-cursor="view"><img src={img} alt={`SŌMA ${i + 1}`} loading={i > 3 ? "lazy" : "eager"} /><span>{String(i + 1).padStart(2, "0")}</span></button>
            </Reveal>
          ))}
        </div>
      </section>
      <AnimatePresence>
        {box !== null && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="lb-close" onClick={() => setBox(null)} aria-label="Close"><X /></button>
            <button className="lb-nav" onClick={() => setBox((box - 1 + GALLERY.length) % GALLERY.length)} aria-label="Previous"><ArrowLeft /></button>
            <motion.img key={box} src={GALLERY[box]} alt="" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }} />
            <button className="lb-nav" onClick={() => setBox((box + 1) % GALLERY.length)} aria-label="Next"><ArrowRight /></button>
            <span className="lb-count">{String(box + 1).padStart(2, "0")} / {GALLERY.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* -------------------------------------------------------------- Journal */
export function JournalPage({ lang, slug }: { lang: Lang; slug: string }) {
  if (slug) {
    const i = Math.max(0, Number(slug.replace("article-", "")) - 1);
    const p = POSTS[i] ?? POSTS[0];
    return (
      <>
        <PageHero lang={lang} eyebrow={tx(lang, p.cat)} crumbs={[{ to: "blog", label: "Journal" }]} title={tx(lang, p.title)} intro={`${tx(lang, p.cat)} · 6 min`} image={p.image} />
        <article className="section article">
          <Reveal><p className="article-lead">{fr(lang, "Une expérience réussie commence bien avant l’arrivée du premier invité. Elle naît d’une intention, d’un rythme et de choix invisibles.", "A successful experience begins long before the first guest arrives. It grows from intention, rhythm and invisible choices.")}</p></Reveal>
          <Reveal><h2>{fr(lang, "L’émotion comme point de départ", "Emotion as a starting point")}</h2></Reveal>
          <Reveal><p>{fr(lang, "Chez SŌMA, chaque décision sert une sensation. La lumière, le son, l’accueil et les temps de respiration construisent ensemble une mémoire collective.", "At SŌMA, every decision serves a feeling. Light, sound, hospitality and pauses work together to build a collective memory.")}</p></Reveal>
          <Reveal><blockquote>“{fr(lang, "Chaque détail participe à l’expérience.", "Every detail shapes the experience.")}”</blockquote></Reveal>
          <Reveal><p>{fr(lang, "Le parcours invité se dessine comme une partition : un accueil qui rassure, une montée en intensité, puis des moments suspendus où l’on prend le temps de se retrouver.", "The guest journey is written like a score: a reassuring welcome, a rise in intensity, then suspended moments where people take time to connect.")}</p></Reveal>
          <Reveal className="row-actions"><Btn lang={lang} to="blog" variant="dark">{fr(lang, "Tous les articles", "All articles")}</Btn></Reveal>
        </article>
      </>
    );
  }
  return (
    <>
      <PageHero lang={lang} eyebrow="Journal" title={fr(lang, "Idées, coulisses *& inspirations.*", "Ideas, backstage *& inspiration.*")} />
      <section className="section">
        <div className="container post-grid">
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
      </section>
    </>
  );
}

/* ----------------------------------------------------------------- Shop */
export function ShopPage({ lang }: { lang: Lang }) {
  const [cart, setCart] = useState<string[]>([]);
  const order = () => waLink(`${fr(lang, "Bonjour Bonnets Land, je souhaite commander", "Hello Bonnets Land, I’d like to order")} : ${cart.join(", ")}`);
  return (
    <>
      <PageHero lang={lang} eyebrow="Bonnets Land" title={fr(lang, "Objets choisis, *allure libre.*", "Selected objects, *effortless style.*")} intro={fr(lang, "Les éditions de la maison, à commander directement sur WhatsApp.", "The house editions, to order directly on WhatsApp.")} />
      <section className="section">
        <div className="container shop-grid">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <article className="product">
                <div className="product-img"><img src={p.img} alt={p.name} loading="lazy" /><span>{tx(lang, p.tag)}</span></div>
                <div className="product-meta"><h2>{p.name}</h2><p>{p.price}</p></div>
                <button className="btn btn-dark" onClick={() => setCart([...cart, p.name])}><span>{fr(lang, "Ajouter au panier", "Add to bag")}</span><i><Plus /><Plus /></i></button>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div className="cart-bar" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}>
            <ShoppingBag /><span>{cart.length} {fr(lang, "article(s)", "item(s)")}</span>
            <button onClick={() => setCart(cart.slice(0, -1))} aria-label="-"><Minus /></button>
            <a className="btn btn-gold btn-sm" href={order()} target="_blank" rel="noreferrer"><span>{fr(lang, "Commander", "Order")}</span><i><ArrowUpRight /><ArrowUpRight /></i></a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ FAQ */
export function FaqPage({ lang }: { lang: Lang }) {
  return (
    <>
      <PageHero lang={lang} eyebrow="FAQ" title={fr(lang, "Avant de *commencer.*", "Before we *begin.*")} intro={fr(lang, "Les réponses aux questions que l’on nous pose le plus souvent.", "Answers to the questions we are asked most often.")} />
      <section className="section"><div className="container narrow"><FaqList lang={lang} items={FAQ} /></div></section>
      <FinalCta lang={lang} />
    </>
  );
}

/* -------------------------------------------------------------- Contact */
export function ContactPage({ lang }: { lang: Lang }) {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const fields = [`${fr(lang, "Nom", "Name")}: ${d.name}`, d.company ? `${fr(lang, "Entreprise", "Company")}: ${d.company}` : "", `Email: ${d.email}`, d.phone ? `WhatsApp: ${d.phone}` : "", `Service: ${d.service}`, `Budget: ${d.budget}`].filter(Boolean);
    const body = `${fields.join("\n")}\n\n${d.message}`;
    window.open(waLink(`${fr(lang, "Bonjour SŌMA, nouvelle demande :", "Hello SŌMA, new request:")}\n${body}`), "_blank");
    setSent(true);
  };
  return (
    <>
      <PageHero lang={lang} eyebrow="Contact" title={fr(lang, "Parlons de *votre idée.*", "Let’s talk about *your idea.*")} intro={fr(lang, "Une occasion, une marque, une intention ? Écrivez-nous. Nous prendrons le temps de comprendre ce que vous souhaitez faire vivre.", "An occasion, a brand, an intention? Write to us. We’ll take time to understand what you want people to experience.")} />
      <section className="section">
        <div className="container contact-grid">
          <Reveal className="contact-cards">
            {[
              ["Email", CONTACT.email, `mailto:${CONTACT.email}`],
              ["WhatsApp", CONTACT.phone, waLink(fr(lang, "Bonjour SŌMA !", "Hello SŌMA!"))],
              [fr(lang, "Studio", "Studio"), tx(lang, CONTACT.city), ""],
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
              <label>{fr(lang, "Entreprise", "Company")}<input name="company" /></label>
              <label>Email<input name="email" type="email" required /></label>
              <label>WhatsApp<input name="phone" /></label>
              <label>Service<select name="service">{SERVICES.map((s) => <option key={s.title.fr}>{tx(lang, s.title)}</option>)}</select></label>
              <label>{fr(lang, "Budget estimatif", "Estimated budget")}<select name="budget"><option>{fr(lang, "À définir", "To be defined")}</option><option>5–15 M GNF</option><option>15–50 M GNF</option><option>50 M+ GNF</option></select></label>
              <label className="full">Message<textarea name="message" rows={5} required /></label>
              <button className="btn btn-gold full" type="submit"><span>{sent ? fr(lang, "Demande préparée sur WhatsApp", "Request prepared on WhatsApp") : fr(lang, "Envoyer la demande", "Send request")}</span><i>{sent ? <><Check /><Check /></> : <><ArrowUpRight /><ArrowUpRight /></>}</i></button>
              <p className="form-note">{fr(lang, "Votre message s’ouvre dans WhatsApp, prêt à être envoyé.", "Your message opens in WhatsApp, ready to send.")}</p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* -------------------------------------------------------------- Booking */
export function BookingPage({ lang }: { lang: Lang }) {
  const [step, setStep] = useState(1);
  const [c, setC] = useState<Record<string, string>>({});
  const types = lang === "fr" ? ["Événement privé", "Événement corporate", "Activation de marque", "Shooting", "Prestation bar", "Autre projet"] : ["Private event", "Corporate event", "Brand activation", "Shoot", "Bar service", "Other project"];
  const guests = lang === "fr" ? ["Moins de 30", "30 – 100", "100 – 300", "Plus de 300"] : ["Under 30", "30 – 100", "100 – 300", "Over 300"];
  const total = 5;
  const canNext = (step === 1 && c.world) || (step === 2 && c.type) || step === 3 || (step === 4 && c.name && c.phone) || step === 5;
  const send = () => {
    const lines = [fr(lang, "Bonjour SŌMA, je souhaite réserver :", "Hello SŌMA, I’d like to book:"), `• ${fr(lang, "Univers", "World")}: ${c.world}`, `• ${fr(lang, "Prestation", "Service")}: ${c.type}`, `• Date: ${c.date || fr(lang, "à définir", "to be defined")}`, `• ${fr(lang, "Invités", "Guests")}: ${c.guests || "—"}`, `• ${fr(lang, "Nom", "Name")}: ${c.name}`, `• WhatsApp: ${c.phone}`, c.message ? `\n${c.message}` : ""];
    window.open(waLink(lines.join("\n")), "_blank");
    setStep(6);
  };
  const set = (k: string, v: string) => setC({ ...c, [k]: v });
  return (
    <section className="booking">
      <div className="booking-aside">
        <img className="booking-bg" src={IMG.toast} alt="" />
        <div className="booking-aside-copy">
          <Eyebrow light>{fr(lang, "Réservation guidée", "Guided booking")}</Eyebrow>
          <SplitWords as="h1" immediate text={fr(lang, "Commençons par *votre intention.*", "Let’s begin with *your intention.*")} />
          <p>{fr(lang, "Cinq questions, deux minutes. Nous revenons vers vous sous 48 h.", "Five questions, two minutes. We’ll get back to you within 48 hours.")}</p>
        </div>
        <span>{tx(lang, CONTACT.city)}</span>
      </div>
      <div className="booking-main">
        {step <= total && <div className="booking-progress"><span>{String(step).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><div><motion.i animate={{ width: `${(step / total) * 100}%` }} transition={{ ease: EASE, duration: 0.6 }} /></div></div>}
        <AnimatePresence mode="wait">
          <motion.div key={step} className="booking-step" initial={{ opacity: 0, x: 30, filter: "blur(6px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -30, filter: "blur(6px)" }} transition={{ duration: 0.45, ease: EASE }}>
            {step === 1 && <Choice title={fr(lang, "Quel univers vous intéresse ?", "Which world interests you?")} items={WORLDS.map((w) => w.name)} value={c.world} select={(v) => set("world", v)} />}
            {step === 2 && <Choice title={fr(lang, "Quel type de prestation ?", "What kind of service?")} items={types} value={c.type} select={(v) => set("type", v)} />}
            {step === 3 && <><h2>{fr(lang, "Quand et pour combien d’invités ?", "When, and for how many guests?")}</h2><label className="field">Date<input type="date" value={c.date ?? ""} onChange={(e) => set("date", e.target.value)} /></label><div className="choice-grid small">{guests.map((g) => <button key={g} className={c.guests === g ? "selected" : ""} onClick={() => set("guests", g)}>{g}{c.guests === g && <Check />}</button>)}</div></>}
            {step === 4 && <><h2>{fr(lang, "Comment pouvons-nous vous joindre ?", "How can we reach you?")}</h2><div className="booking-fields"><input placeholder={fr(lang, "Votre nom *", "Your name *")} value={c.name ?? ""} onChange={(e) => set("name", e.target.value)} /><input placeholder="WhatsApp *" value={c.phone ?? ""} onChange={(e) => set("phone", e.target.value)} /><textarea placeholder={fr(lang, "Parlez-nous de votre idée…", "Tell us about your idea…")} value={c.message ?? ""} onChange={(e) => set("message", e.target.value)} /></div></>}
            {step === 5 && <><h2>{fr(lang, "Votre demande, en un regard.", "Your request, at a glance.")}</h2><dl className="summary">{[[fr(lang, "Univers", "World"), c.world], [fr(lang, "Prestation", "Service"), c.type], ["Date", c.date || fr(lang, "À définir", "To be defined")], [fr(lang, "Invités", "Guests"), c.guests || "—"], [fr(lang, "Contact", "Contact"), `${c.name} · ${c.phone}`]].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></>}
            {step === 6 && <div className="success"><span><Check /></span><h2>{fr(lang, "Votre demande est prête.", "Your request is ready.")}</h2><p>{fr(lang, "Merci ! Envoyez le message WhatsApp qui vient de s’ouvrir : l’équipe SŌMA vous recontacte pour affiner votre projet.", "Thank you! Send the WhatsApp message that just opened: the SŌMA team will contact you to refine your project.")}</p><Btn lang={lang} to="" variant="dark">{fr(lang, "Retour à l’accueil", "Back home")}</Btn></div>}
          </motion.div>
        </AnimatePresence>
        {step <= total && (
          <div className="booking-controls">
            {step > 1 ? <button className="link-arrow" onClick={() => setStep(step - 1)}><ArrowLeft />{fr(lang, "Précédent", "Previous")}</button> : <span />}
            <button className="btn btn-dark" disabled={!canNext} onClick={() => (step === total ? send() : setStep(step + 1))}><span>{step === total ? fr(lang, "Envoyer sur WhatsApp", "Send on WhatsApp") : fr(lang, "Continuer", "Continue")}</span><i><ArrowRight /><ArrowRight /></i></button>
          </div>
        )}
      </div>
    </section>
  );
}
function Choice({ title, items, value, select }: { title: string; items: string[]; value?: string; select: (s: string) => void }) {
  return <><h2>{title}</h2><div className="choice-grid">{items.map((x, i) => <button className={value === x ? "selected" : ""} key={x} onClick={() => select(x)}><span>0{i + 1}</span>{x}{value === x && <Check />}</button>)}</div></>;
}
