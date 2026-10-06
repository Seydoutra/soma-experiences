"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import Lenis from "lenis";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Lenis smooth scrolling (Octolane-like inertia). Disabled for reduced motion. */
export function SmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, [reduce]);
  return null;
}

export function scrollToTop() {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

/** Thin gold progress bar at the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

/** Fade + rise + un-blur when entering the viewport. */
export function Reveal({ children, delay = 0, y = 28, className, as = "div" }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "article" | "section" }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/** Splits text into words; words between *asterisks* are flagged as accent. */
function parseAccent(text: string) {
  return text.split(" ").reduce<{ word: string; italic: boolean; open: boolean }[]>((acc, raw) => {
    const prevOpen = acc.length ? acc[acc.length - 1].open : false;
    const italic = prevOpen || raw.startsWith("*");
    const closes = /\*[.,?!]?$/.test(raw) && (raw.length > 1 || !raw.startsWith("*"));
    acc.push({ word: raw.replaceAll("*", ""), italic, open: italic && !closes });
    return acc;
  }, []);
}

/**
 * Word-by-word blur reveal. Words wrapped in *asterisks* are rendered in the
 * italic serif accent.
 */
export function SplitWords({ text, className, delay = 0, stagger = 0.06, as = "h2", immediate = false }: { text: string; className?: string; delay?: number; stagger?: number; as?: "h1" | "h2" | "h3" | "p"; immediate?: boolean }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const show = immediate || inView;
  const Tag = as;
  const words = parseAccent(text);
  return (
    <Tag ref={ref} className={className} aria-label={text.replaceAll("*", "")}>
      {words.map(({ word, italic: isItalic }, i) => {
        return (
          <span key={i} className="split-word" aria-hidden>
            <motion.span
              className={isItalic ? "accent" : undefined}
              initial={reduce ? false : { opacity: 0, y: "0.5em", filter: "blur(10px)" }}
              animate={show ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
              transition={{ duration: 0.8, ease: EASE, delay: delay + i * stagger }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}

/** Text whose words light up one after another as the paragraph scrolls through the viewport. */
export function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = parseAccent(text);
  return (
    <p ref={ref} className={`scroll-highlight ${className ?? ""}`}>
      {words.map((w, i) => <HighlightWord key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} word={w.word} italic={w.italic} last={i === words.length - 1} />)}
    </p>
  );
}
function HighlightWord({ progress, range, word, italic, last }: { progress: MotionValue<number>; range: [number, number]; word: string; italic: boolean; last: boolean }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <><motion.span style={{ opacity }} className={italic ? "accent" : undefined}>{word}</motion.span>{last ? "" : " "}</>;
}

/** Number that counts up when visible. */
export function Counter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now(), duration = 1600;
    let id = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setN(Math.round(value * (1 - Math.pow(1 - p, 4))));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, value]);
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

/** Infinite marquee. Content is duplicated for a seamless loop. */
export function Marquee({ children, reverse = false, speed = 40, className }: { children: ReactNode; reverse?: boolean; speed?: number; className?: string }) {
  return (
    <div className={`marquee ${className ?? ""}`} style={{ "--speed": `${speed}s` } as CSSProperties}>
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden>{children}</div>
      </div>
    </div>
  );
}

/** Card with a radial spotlight that follows the pointer (Octolane-style bento). */
export function Spotlight({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`spotlight ${className ?? ""}`}
      style={style}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r || !ref.current) return;
        ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
        ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}

/** Element gently attracted towards the pointer. */
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.span
      className="magnetic"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.span>
  );
}

/** Image with scroll parallax inside an overflow-hidden frame. */
export function ParallaxImage({ src, alt, className, amount = 12 }: { src: string; alt: string; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`parallax ${className ?? ""}`}>
      <motion.img src={src} alt={alt} style={{ y, scale: 1 + amount / 50 }} loading="lazy" />
    </div>
  );
}

const subscribeNoop = () => () => {};

/** Small cursor follower for fine pointers; grows over interactive elements. */
export function Cursor({ label }: { label: string }) {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 }), sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [state, setState] = useState<"" | "hover" | "view">("");
  const enabled = useSyncExternalStore(subscribeNoop, () => window.matchMedia("(pointer: fine)").matches, () => false);
  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      if (el?.closest("[data-cursor='view']")) setState("view");
      else if (el?.closest("a,button,summary,input,select,textarea,label")) setState("hover");
      else setState("");
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);
  if (!enabled) return null;
  return <motion.div className={`cursor ${state}`} style={{ x: sx, y: sy }} aria-hidden><span>{label}</span></motion.div>;
}

export { motion, useScroll, useTransform, useSpring, useReducedMotion, EASE };
