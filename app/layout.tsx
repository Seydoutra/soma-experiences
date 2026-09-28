import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://seydoutra.github.io/soma-experiences"),
  title: { default: "SŌMA Experiences — Agence événementielle à Conakry", template: "%s — SŌMA Experiences" },
  description: "SŌMA Experiences imagine, conçoit et produit des événements élégants et profondément personnalisés à Conakry, en Guinée.",
  keywords: ["agence événementielle Conakry", "organisation événement Guinée", "event planner Guinée", "agence créative Conakry", "photographe Conakry"],
  alternates: { languages: { fr: "/fr", en: "/en" } },
  icons: { icon: "./favicon.svg", shortcut: "./favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SŌMA Experiences",
    founder: "Catherine Soumah",
    email: "soumahcatherine@gmail.com",
    telephone: "+224620327391",
    address: { "@type": "PostalAddress", addressLocality: "Conakry", addressCountry: "GN" },
    areaServed: "Guinea",
  };
  return <html lang="fr"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
