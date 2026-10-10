import type { Metadata } from "next";
import SomaSite from "@/components/soma-site";

const VIBES_PAGES = ["concept", "evenements", "galerie", "partenaires", "contact"];
const VIBES_EVENTS = ["sunset-ritual", "onomo-vibes"];

export const dynamicParams = false;
export function generateStaticParams() {
  const pages = ["about", "services", "univers", "realisations", "galerie", "blog", "boutique", "faq", "contact", "reservation", "vibes"];
  const details = [
    ...["soma-experiences", "vibes-by-soma", "soma-bar", "soft-glow-shoot", "bonnets-land"].map((x) => ["univers", x]),
    ...["nomo-vibes", "after-dark", "golden-hour", "soft-glow-01"].map((x) => ["realisations", x]),
    ...["article-1", "article-2", "article-3"].map((x) => ["blog", x]),
    ...VIBES_PAGES.map((x) => ["vibes", x]),
  ];
  return (["fr", "en"] as const).flatMap((lang) => [
    { slug: [lang] },
    ...pages.map((page) => ({ slug: [lang, page] })),
    ...details.map((parts) => ({ slug: [lang, ...parts] })),
    ...VIBES_EVENTS.map((e) => ({ slug: [lang, "vibes", "evenements", e] })),
  ]);
}

const VIBES_TITLES: Record<string, { fr: string; en: string }> = {
  concept: { fr: "Le concept", en: "The concept" },
  evenements: { fr: "Événements", en: "Events" },
  galerie: { fr: "Galerie", en: "Gallery" },
  partenaires: { fr: "Partenaires", en: "Partners" },
  contact: { fr: "Contact", en: "Contact" },
};

/** The VIBES pages carry their own title and description; the group pages keep the layout defaults. */
export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const [lang, page, sub, detail] = (await params).slug;
  if (page !== "vibes") return {};
  const en = lang === "en";
  const name = detail === "sunset-ritual" ? (en ? "Sunset Ritual, Edition 02" : "Sunset Ritual, Édition 02") : detail === "onomo-vibes" ? (en ? "ONOMO Vibes, Edition 01" : "ONOMO Vibes, Édition 01") : sub ? VIBES_TITLES[sub]?.[en ? "en" : "fr"] : undefined;
  return {
    title: { absolute: name ? `${name} | VIBES by SŌMA` : en ? "VIBES by SŌMA | Signature gatherings in Conakry" : "VIBES by SŌMA | Concepts signature à Conakry" },
    description: en
      ? "VIBES by SŌMA, a SŌMA Experiences concept: signature gatherings in Conakry. Next edition: Sunset Ritual, 21 November 2026, Camayenne Beach."
      : "VIBES by SŌMA, un concept de SŌMA Experiences : des rendez-vous signature à Conakry. Prochaine édition : Sunset Ritual, le 21 novembre 2026, plage Camayenne.",
  };
}

export default function CatchAllPage() {
  return <SomaSite />;
}
