import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://seydoutra.github.io/soma-experiences"),
  title: { default: "SŌMA Experiences | Agence événementielle à Conakry", template: "%s | SŌMA Experiences" },
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
    sameAs: ["https://www.instagram.com/somaexperiences_/", "https://www.tiktok.com/@somaexperiences"],
  };
  const event = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Onomo Vibes, Splash & Grill (2ᵉ édition)",
    startDate: "2026-11-21",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: "Conakry", address: { "@type": "PostalAddress", addressLocality: "Conakry", addressCountry: "GN" } },
    organizer: { "@type": "Organization", name: "SŌMA Experiences", url: "https://seydoutra.github.io/soma-experiences" },
    offers: { "@type": "Offer", url: "https://billetfacile.com/evenements/onomo-vibes-splash-and-grill", availability: "https://schema.org/InStock" },
  };
  return <html lang="fr"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@300..800&family=Unbounded:wght@500..800&display=swap" /><meta name="theme-color" content="#0d0b09" /></head><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(event) }} /></body></html>;
}
