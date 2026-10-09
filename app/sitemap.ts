import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://seydoutra.github.io/soma-experiences";
  const routes = ["", "/about", "/services", "/univers", "/realisations", "/galerie", "/blog", "/boutique", "/faq", "/contact", "/reservation", "/vibes", "/vibes/concept", "/vibes/evenements", "/vibes/evenements/onomo-vibes", "/vibes/galerie", "/vibes/partenaires", "/vibes/contact"];
  return (["fr", "en"] as const).flatMap((lang) => routes.map((route) => ({ url: `${base}/${lang}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : .7 })));
}
