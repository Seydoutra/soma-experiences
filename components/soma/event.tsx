"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, Ticket } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { EVENT, IMG, SOCIAL, type Lang, tx } from "./data";
import { Btn, Eyebrow } from "./chrome";
import { EASE, ParallaxImage, Reveal, SplitWords } from "./motion";

const START = Date.parse(EVENT.start);
const END = Date.parse(EVENT.end);

/** Current time, ticking every second. Null until mounted so server and client markup match. */
export function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => { clearTimeout(first); clearInterval(id); };
  }, []);
  return now;
}

/** True while the event is upcoming or happening (also during server render). */
export function useEventLive() {
  const now = useNow();
  return now === null || now < END;
}

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

export function daysLeft(now: number | null) {
  return now === null ? null : Math.max(0, Math.ceil((START - now) / 86400000));
}

function Digit({ value }: { value: string }) {
  return (
    <span className="cd-digit">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={value} initial={{ y: "-100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>{value}</motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Countdown({ lang }: { lang: Lang }) {
  const now = useNow();
  if (now !== null && now >= START) {
    return <div className="countdown live"><span className="pulse" />{lang === "fr" ? "C’est maintenant ! On vous attend." : "It’s happening now! See you there."}</div>;
  }
  const p = now === null ? null : parts(START - now);
  const units: [keyof NonNullable<typeof p>, string][] = [["d", lang === "fr" ? "Jours" : "Days"], ["h", lang === "fr" ? "Heures" : "Hours"], ["m", "Minutes"], ["s", lang === "fr" ? "Secondes" : "Seconds"]];
  return (
    <div className="countdown" role="timer" aria-label={lang === "fr" ? "Compte à rebours" : "Countdown"}>
      {units.map(([k, label]) => {
        const v = p ? String(p[k]).padStart(2, "0") : "--";
        return (
          <div key={k} className="cd-unit">
            <strong>{v.split("").map((c, i) => <Digit key={`${k}${i}${v.length}`} value={c} />)}</strong>
            <small>{label}</small>
          </div>
        );
      })}
    </div>
  );
}

/** Rotating circular "tickets available" sticker. */
function Sticker({ lang }: { lang: Lang }) {
  const text = lang === "fr" ? "Billets disponibles • Billets disponibles • " : "Tickets available • Tickets available • ";
  return (
    <a className="sticker" href={EVENT.tickets} target="_blank" rel="noreferrer" aria-label={lang === "fr" ? "Acheter un billet" : "Buy a ticket"}>
      <svg viewBox="0 0 120 120" aria-hidden>
        <defs><path id="sticker-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
        <text><textPath href="#sticker-circle">{text}</textPath></text>
      </svg>
      <Ticket />
    </a>
  );
}

/** Full event feature: image, title, date, countdown and ticket CTA. Hidden once the event is over. */
export function EventSpotlight({ lang }: { lang: Lang }) {
  const live = useEventLive();
  if (!live) return null;
  return (
    <section className="event section dark" id="evenement">
      <div className="event-glow" />
      <div className="container event-grid">
        <Reveal className="event-media">
          <ParallaxImage src={IMG.signage} alt={`${EVENT.name}, ${EVENT.subtitle}`} amount={8} />
          <span className="event-badge">{tx(lang, EVENT.edition)}</span>
          <Sticker lang={lang} />
        </Reveal>
        <div className="event-copy">
          <Reveal><Eyebrow light>{lang === "fr" ? "Prochain rendez-vous · VIBES by SŌMA" : "Next gathering · VIBES by SŌMA"}</Eyebrow></Reveal>
          <SplitWords text={`${EVENT.name} *${EVENT.subtitle}.*`} />
          <Reveal delay={0.1}>
            <p className="event-date"><CalendarDays />{tx(lang, EVENT.date)} · Conakry</p>
            <p className="lede">{lang === "fr"
              ? "Après une première édition qui a marqué la ville, Onomo Vibes revient pour une deuxième édition : musique, mousse, grill et good vibes, dans l’univers signature de SŌMA."
              : "After a first edition that left its mark on the city, Onomo Vibes is back for a second edition: music, foam, grill and good vibes, in SŌMA’s signature world."}</p>
          </Reveal>
          <Reveal delay={0.15}><Countdown lang={lang} /></Reveal>
          <Reveal delay={0.2} className="event-actions">
            <Btn lang={lang} to={EVENT.tickets} external>{lang === "fr" ? "Acheter mon billet" : "Get my ticket"}</Btn>
            <Btn lang={lang} to={SOCIAL.instagram} external variant="ghost">{lang === "fr" ? "Suivre sur Instagram" : "Follow on Instagram"}</Btn>
          </Reveal>
          <Reveal delay={0.25}><p className="event-note">{lang === "fr" ? "Billetterie sécurisée via Billetfacile. Places limitées." : "Secure ticketing via Billetfacile. Limited spots."}</p></Reveal>
        </div>
      </div>
    </section>
  );
}

/** Small chip used in the hero: event name, days left, ticket link. */
export function EventChip({ lang }: { lang: Lang }) {
  const now = useNow();
  if (now !== null && now >= END) return null;
  const d = daysLeft(now);
  const when = d === null ? "21.11.2026" : d === 0 ? (lang === "fr" ? "C’est aujourd’hui" : "Today") : `J-${d}`;
  return (
    <a className="hero-chip" href={EVENT.tickets} target="_blank" rel="noreferrer">
      <span className="pulse" /><strong>{EVENT.name}</strong> · {tx(lang, EVENT.edition)} · {when}<em>{lang === "fr" ? "Billets" : "Tickets"}<ArrowUpRight /></em>
    </a>
  );
}

/** Header ticket link with a live dot. */
export function HeaderTickets({ lang }: { lang: Lang }) {
  const live = useEventLive();
  if (!live) return null;
  return <a className="header-tickets" href={EVENT.tickets} target="_blank" rel="noreferrer"><span className="pulse" />{lang === "fr" ? "Billets" : "Tickets"}</a>;
}

/** Compact banner for inner pages linked to the event (VIBES world, past edition). */
export function EventBanner({ lang }: { lang: Lang }) {
  const now = useNow();
  if (now !== null && now >= END) return null;
  const d = daysLeft(now);
  return (
    <section className="section tight">
      <div className="container">
        <Reveal>
          <a className="event-banner" href={EVENT.tickets} target="_blank" rel="noreferrer" data-cursor="view">
            <img src={IMG.foam} alt="" loading="lazy" />
            <div>
              <span>{tx(lang, EVENT.edition)} · {tx(lang, EVENT.date)}</span>
              <h3>{EVENT.name} <em>{EVENT.subtitle}</em></h3>
            </div>
            <strong>{d === null ? "" : d === 0 ? (lang === "fr" ? "Aujourd’hui" : "Today") : `J-${d}`}</strong>
            <i><Ticket /></i>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function EventMenuLink({ lang, onClick }: { lang: Lang; onClick?: () => void }) {
  const live = useEventLive();
  if (!live) return null;
  return <a className="menu-event" href={EVENT.tickets} target="_blank" rel="noreferrer" onClick={onClick}><span className="pulse" /><div><small>{tx(lang, EVENT.edition)} · 21.11.2026</small><strong>{EVENT.name} · {lang === "fr" ? "Billets" : "Tickets"}</strong></div><ArrowUpRight /></a>;
}

