import { CONTACT, EVENT, IMG, PAST_EDITION, SOCIAL, type Tx } from "../soma/data";

/** Root of the VIBES site inside the group site. */
export const VIBES_ROOT = "vibes";
export const vpath = (to = "") => (to ? `${VIBES_ROOT}/${to}` : VIBES_ROOT);

/**
 * VIBES has no dedicated contact details or social accounts yet: it uses the
 * group's. Replace here once they exist.
 */
export const VIBES_CONTACT = { ...CONTACT };
export const VIBES_SOCIAL = { ...SOCIAL };

export const VIBES_NAV: { slug: string; label: Tx }[] = [
  { slug: "concept", label: { fr: "Le concept", en: "The concept" } },
  { slug: "evenements", label: { fr: "Événements", en: "Events" } },
  { slug: "galerie", label: { fr: "Galerie", en: "Gallery" } },
  { slug: "partenaires", label: { fr: "Partenaires", en: "Partners" } },
  { slug: "contact", label: { fr: "Contact", en: "Contact" } },
];

export const PILLARS: { title: Tx; desc: Tx }[] = [
  { title: { fr: "Musique", en: "Music" }, desc: { fr: "Une programmation pensée pour faire monter l’énergie au fil de la soirée.", en: "Programming designed to build the energy as the night goes on." } },
  { title: { fr: "Style", en: "Style" }, desc: { fr: "Une direction artistique soignée, à vivre sur place et à retrouver en images.", en: "Careful creative direction, to live on site and find again in pictures." } },
  { title: { fr: "Partage", en: "Sharing" }, desc: { fr: "Des rendez-vous où l’on vient pour se retrouver, entre amis ou en grand groupe.", en: "Gatherings people come to for each other, with friends or as a crowd." } },
];

export const FORMATS: { title: Tx; desc: Tx }[] = [
  { title: { fr: "Concepts propriétaires", en: "Owned concepts" }, desc: { fr: "Des rendez-vous signés VIBES, avec leur nom, leur identité et leurs éditions.", en: "Gatherings signed VIBES, with their own name, identity and editions." } },
  { title: { fr: "Programmation", en: "Programming" }, desc: { fr: "Le choix des artistes, du rythme et des temps forts de chaque soirée.", en: "Choosing the artists, the pace and the highlights of each night." } },
  { title: { fr: "Expérience de marque", en: "Brand experience" }, desc: { fr: "Des marques associées aux soirées, de façon cohérente avec l’univers.", en: "Brands joining the nights in a way that fits the world." } },
];

/**
 * VIBES by SŌMA is a concept created by SŌMA Experiences. Each event is a new
 * edition. Photos only exist for editions that took place.
 */
export type VibesEdition = {
  slug: string;
  number: string;
  name: string;
  subtitle?: string;
  edition: Tx;
  date: Tx;
  venue: Tx;
  status: "past" | "upcoming";
  image?: string;
  intro: Tx;
  ingredients: { fr: string[]; en: string[] };
  gallery: string[];
};

export const VIBES_EDITIONS: VibesEdition[] = [
  {
    slug: EVENT.slug,
    number: EVENT.number,
    name: EVENT.name,
    edition: EVENT.edition,
    date: EVENT.date,
    venue: EVENT.venue,
    status: "upcoming",
    intro: {
      fr: "La nouvelle édition de VIBES by SŌMA : un rendez-vous au coucher du soleil sur la plage Camayenne, en Sunset Neutrals.",
      en: "The new VIBES by SŌMA edition: a sunset gathering on Camayenne Beach, dressed in Sunset Neutrals.",
    },
    ingredients: { fr: ["Coucher de soleil", "Plage Camayenne", "Musique", "Sunset Neutrals"], en: ["Sunset", "Camayenne Beach", "Music", "Sunset Neutrals"] },
    gallery: [],
  },
  {
    slug: PAST_EDITION.slug,
    number: PAST_EDITION.number,
    name: PAST_EDITION.name,
    subtitle: PAST_EDITION.subtitle,
    edition: PAST_EDITION.edition,
    date: PAST_EDITION.date,
    venue: PAST_EDITION.venue,
    status: "past",
    image: IMG.signage,
    intro: {
      fr: "La première édition de VIBES by SŌMA, à l’Hôtel ONOMO Conakry : une journée qui se prolonge en soirée, autour de la musique, de la mousse, du grill et des good vibes.",
      en: "The first VIBES by SŌMA edition, at Hôtel ONOMO Conakry: a day that runs into the night, around music, foam, grill and good vibes.",
    },
    ingredients: { fr: ["Musique", "Mousse", "Grill", "Good vibes"], en: ["Music", "Foam", "Grill", "Good vibes"] },
    gallery: [IMG.foam, IMG.crowd, IMG.toast, IMG.performance, IMG.hero],
  },
];

export const NEXT_EDITION = VIBES_EDITIONS.find((e) => e.status === "upcoming");
export const PAST_EDITIONS = VIBES_EDITIONS.filter((e) => e.status === "past");

/** Photos from Edition 01 (ONOMO Vibes). */
export const VIBES_GALLERY = [IMG.signage, IMG.foam, IMG.crowd, IMG.toast, IMG.performance, IMG.hero, IMG.bottles];

export const COLLABS: { title: Tx; desc: Tx }[] = [
  { title: { fr: "Visibilité", en: "Visibility" }, desc: { fr: "Votre marque présente sur le lieu et sur les supports de l’événement.", en: "Your brand on site and on the event’s materials." } },
  { title: { fr: "Activation sur place", en: "On-site activation" }, desc: { fr: "Un espace, une dégustation ou une animation pensés avec l’équipe VIBES.", en: "A space, a tasting or an activity designed with the VIBES team." } },
  { title: { fr: "Contenus", en: "Content" }, desc: { fr: "Des images et des vidéos de la soirée où votre marque trouve sa place.", en: "Photos and videos of the night where your brand has its place." } },
  { title: { fr: "Format sur mesure", en: "Bespoke format" }, desc: { fr: "Un rendez-vous VIBES imaginé autour de votre marque ou de votre lieu.", en: "A VIBES gathering built around your brand or your venue." } },
];
