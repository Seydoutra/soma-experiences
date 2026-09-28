import SomaSite from "@/components/soma-site";

export const dynamicParams = false;
export function generateStaticParams() {
  const pages = ["about", "services", "univers", "realisations", "galerie", "blog", "boutique", "faq", "contact", "reservation"];
  const details = [
    ...["soma-experiences", "vibes-by-soma", "soma-bar", "soft-glow-shoot", "bonnets-land"].map((x) => ["univers", x]),
    ...["nomo-vibes", "after-dark", "golden-hour", "soft-glow-01"].map((x) => ["realisations", x]),
    ...["article-1", "article-2", "article-3"].map((x) => ["blog", x]),
  ];
  return (["fr", "en"] as const).flatMap((lang) => [
    { slug: [lang] },
    ...pages.map((page) => ({ slug: [lang, page] })),
    ...details.map(([page, item]) => ({ slug: [lang, page, item] })),
  ]);
}

export default function CatchAllPage() {
  return <SomaSite />;
}
