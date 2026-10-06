import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://seydoutra.github.io/soma-experiences"),
  title: { default: "SŌMA Experiences — Agence événementielle à Conakry", template: "%s — SŌMA Experiences" },
  description: "SŌMA Experiences imagine, conçoit et produit des événements élégants et profondément personnalisés à Conakry, en Guinée.",
  keywords: ["agence événementielle Conakry", "organisation événement Guinée", "event planner Guinée", "agence créative Conakry", "photographe Conakry"],
  alternates: { languages: { fr: "/fr", en: "/en" } },
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg`, shortcut: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg` },
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
  return <html lang="fr"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@300..800&display=swap" /><meta name="theme-color" content="#0d0b09" /></head><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
