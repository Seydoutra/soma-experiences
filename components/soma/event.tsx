"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin, Shirt, Ticket } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { EVENT, SOCIAL, type Lang, tx } from "./data";
import { Btn, Eyebrow, L } from "./chrome";
import { EASE, Reveal, SplitWords } from "./motion";

const START = Date.parse(EVENT.start);
const END = Date.parse(EVENT.end);
const fr = (lang: Lang, a: string, b: string) => (lang === "fr" ? a : b);

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

function whenLabel(lang: Lang, now: number | null) {
  const d = daysLeft(now);
  if (d === null) return EVENT.shortDate;
  return d === 0 ? fr(lang, "C’est aujourd’hui", "Today") : `J-${d}`;
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
    return <div className="countdown live"><span className="pulse" />{fr(lang, "C’est maintenant ! On vous attend.", "It’s happening now! See you there.")}</div>;
  }
  const p = now === null ? null : parts(START - now);
  const units: [keyof NonNullable<typeof p>, string][] = [["d", fr(lang, "Jours", "Days")], ["h", fr(lang, "Heures", "Hours")], ["m", "Minutes"], ["s", fr(lang, "Secondes", "Seconds")]];
  return (
    <div className="countdown" role="timer" aria-label={fr(lang, "Compte à rebours", "Countdown")}>
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

/** Graphic poster for the edition, in the dress-code colours (no photos exist yet). */
export function SunsetPoster({ lang, compact }: { lang: Lang; compact?: boolean }) {
  return (
    <div className={`sunset-poster ${compact ? "compact" : ""}`} role="img" aria-label={`${EVENT.concept}, ${EVENT.name}, ${tx(lang, EVENT.edition)}, ${tx(lang, EVENT.date)}`}>
      <div className="sp-sun" />
      <div className="sp-sea" />
      <div className="sp-copy">
        <span className="sp-top">{EVENT.concept} · {tx(lang, EVENT.edition)}</span>
        <strong>Sunset<em>Ritual</em></strong>
        <span className="sp-bottom">{EVENT.shortDate} · {fr(lang, "Plage Camayenne", "Camayenne Beach")}</span>
      </div>
    </div>
  );
}

/** Rotating circular sticker linking to the ticket office. */
function Sticker({ lang }: { lang: Lang }) {
  const text = fr(lang, "Billetterie ouverte • Billetterie ouverte • ", "Tickets on sale • Tickets on sale • ");
  return (
    <a className="sticker" href={EVENT.tickets} target="_blank" rel="noreferrer" aria-label={fr(lang, "Prendre mon pass", "Get my pass")}>
      <svg viewBox="0 0 120 120" aria-hidden>
        <defs><path id="sticker-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
        <text><textPath href="#sticker-circle">{text}</textPath></text>
      </svg>
      <Ticket />
    </a>
  );
}

export function EventFacts({ lang }: { lang: Lang }) {
  return (
    <div className="event-facts">
      <span><CalendarDays />{tx(lang, EVENT.date)}</span>
      <span><MapPin />{tx(lang, EVENT.venue)}</span>
      <span><Shirt />Dress code : {EVENT.dressCode}</span>
    </div>
  );
}

export function DressCode({ lang }: { lang: Lang }) {
  return (
    <div className="dress-code">
      <small>Dress code · {EVENT.dressCode}</small>
      <div>{EVENT.palette.map((c) => <span key={c.hex}><i style={{ background: c.hex }} />{tx(lang, c.name)}</span>)}</div>
    </div>
  );
}

/** Full edition feature: poster, facts, countdown, dress code, ticket CTA and QR code. Hidden once the event is over. */
export function EventSpotlight({ lang, vibesLink = true }: { lang: Lang; vibesLink?: boolean }) {
  const live = useEventLive();
  if (!live) return null;
  return (
    <section className="event section dark" id="evenement">
      <div className="event-glow" />
      <div className="container event-grid">
        <Reveal className="event-media">
          <SunsetPoster lang={lang} />
          <Sticker lang={lang} />
        </Reveal>
        <div className="event-copy">
          <Reveal><Eyebrow light>{fr(lang, "Prochain rendez-vous", "Next gathering")} · {EVENT.concept} · {tx(lang, EVENT.edition)}</Eyebrow></Reveal>
          <SplitWords text="Sunset *Ritual.*" />
          <Reveal delay={0.1}>
            <EventFacts lang={lang} />
            <p className="lede">{fr(lang,
              "VIBES by SŌMA revient avec une nouvelle édition : Sunset Ritual, un rendez-vous au coucher du soleil sur la plage Camayenne.",
              "VIBES by SŌMA is back with a new edition: Sunset Ritual, a sunset gathering on Camayenne Beach.")}</p>
          </Reveal>
          <Reveal delay={0.15}><Countdown lang={lang} /></Reveal>
          <Reveal delay={0.18}><DressCode lang={lang} /></Reveal>
          <Reveal delay={0.2} className="event-actions">
            <Btn lang={lang} to={EVENT.tickets} external>{fr(lang, "Prendre mon pass", "Get my pass")}</Btn>
            <Btn lang={lang} to={SOCIAL.instagram} external variant="ghost">{fr(lang, "Suivre sur Instagram", "Follow on Instagram")}</Btn>
          </Reveal>
          <Reveal delay={0.25} className="event-qr">
            <a href={EVENT.tickets} target="_blank" rel="noreferrer"><img src={EVENT.qr} alt={fr(lang, "QR code de la billetterie Sunset Ritual", "Sunset Ritual ticket office QR code")} /></a>
            <p>{fr(lang, "Scannez pour accéder à la billetterie. La billetterie est ouverte ; le programme et les informations pratiques seront communiqués prochainement.", "Scan to open the ticket office. Tickets are on sale; the programme and practical details will be shared soon.")}</p>
          </Reveal>
          {vibesLink && <Reveal delay={0.3}><L lang={lang} to="vibes" className="link-arrow light event-vibes">{fr(lang, "Découvrir VIBES by SŌMA", "Discover VIBES by SŌMA")}<ArrowUpRight /></L></Reveal>}
        </div>
      </div>
    </section>
  );
}

/** Small chip used in heroes: edition name, days left, ticket link. */
export function EventChip({ lang }: { lang: Lang }) {
  const now = useNow();
  if (now !== null && now >= END) return null;
  return (
    <a className="hero-chip" href={EVENT.tickets} target="_blank" rel="noreferrer">
      <span className="pulse" />{EVENT.concept} · <strong>{EVENT.name}</strong> · {whenLabel(lang, now)}<em>{fr(lang, "Billetterie", "Tickets")}<ArrowUpRight /></em>
    </a>
  );
}

/** Header ticket link with a live dot. */
export function HeaderTickets({ lang }: { lang: Lang }) {
  const live = useEventLive();
  if (!live) return null;
  return <a className="header-tickets" href={EVENT.tickets} target="_blank" rel="noreferrer"><span className="pulse" />{fr(lang, "Billetterie", "Tickets")}</a>;
}

/** Compact banner for inner pages linked to the edition. */
export function EventBanner({ lang }: { lang: Lang }) {
  const now = useNow();
  if (now !== null && now >= END) return null;
  return (
    <section className="section tight">
      <div className="container">
        <Reveal>
          <a className="event-banner" href={EVENT.tickets} target="_blank" rel="noreferrer" data-cursor="view">
            <div>
              <span>{EVENT.concept} · {tx(lang, EVENT.edition)} · {tx(lang, EVENT.date)} · {tx(lang, EVENT.venue)}</span>
              <h3>Sunset <em>Ritual</em></h3>
            </div>
            <strong>{now === null ? "" : whenLabel(lang, now)}</strong>
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
  return <a className="menu-event" href={EVENT.tickets} target="_blank" rel="noreferrer" onClick={onClick}><span className="pulse" /><div><small>{EVENT.concept} · {tx(lang, EVENT.edition)} · {EVENT.shortDate}</small><strong>{EVENT.name} · {fr(lang, "Billetterie", "Tickets")}</strong></div><ArrowUpRight /></a>;
}
