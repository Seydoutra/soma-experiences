export type Lang = "fr" | "en";
export type Tx = { fr: string; en: string };
export const tx = (lang: Lang, v: Tx) => v[lang];

export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const IMG = {
  hero: asset("/images/crowd-energy-02.webp"),
  crowd: asset("/images/crowd-energy-01.webp"),
  performance: asset("/images/performance.webp"),
  signage: asset("/images/vibes-signage.webp"),
  foam: asset("/images/foam-party.webp"),
  portraitWhite: asset("/images/guest-portrait-white.webp"),
  portraitBlack: asset("/images/guest-portrait-black.webp"),
  bottles: asset("/images/belaire-table.webp"),
  toast: asset("/images/cocktail-toast.webp"),
  editorial: asset("/images/editorial-portrait.webp"),
  bartender: asset("/images/soma-bar-portrait.webp"),
  bar: asset("/images/soma-bar-service.webp"),
  fashionClose: asset("/images/fashion-portrait-close.webp"),
  fashionFull: asset("/images/fashion-portrait-full.webp"),
  catherine: asset("/images/catherine-soumah.webp"),
  logo: asset("/images/logo-horizontal.png"),
  mark: asset("/images/logo-mark.png"),
};

export const CONTACT = {
  email: "soumahcatherine@gmail.com",
  phone: "+224 620 327 391",
  wa: "224620327391",
  city: { fr: "Conakry, Guinée", en: "Conakry, Guinea" } as Tx,
};

export const SOCIAL = {
  instagram: "https://www.instagram.com/somaexperiences_/",
  tiktok: "https://www.tiktok.com/@somaexperiences",
};

/** Next signature event. Conakry is UTC+0. */
export const EVENT = {
  name: "Onomo Vibes",
  subtitle: "Splash & Grill",
  edition: { fr: "2ᵉ édition", en: "2nd edition" } as Tx,
  start: "2026-11-21T00:00:00Z",
  end: "2026-11-22T06:00:00Z",
  date: { fr: "Samedi 21 novembre 2026", en: "Saturday 21 November 2026" } as Tx,
  tickets: "https://billetfacile.com/evenements/onomo-vibes-splash-and-grill",
};

export const waLink = (text: string) => `https://wa.me/${CONTACT.wa}?text=${encodeURIComponent(text)}`;

export const NAV: { slug: string; label: Tx }[] = [
  { slug: "about", label: { fr: "À propos", en: "About" } },
  { slug: "services", label: { fr: "Services", en: "Services" } },
  { slug: "univers", label: { fr: "Univers", en: "Worlds" } },
  { slug: "realisations", label: { fr: "Réalisations", en: "Work" } },
  { slug: "galerie", label: { fr: "Galerie", en: "Gallery" } },
  { slug: "blog", label: { fr: "Journal", en: "Journal" } },
  { slug: "boutique", label: { fr: "Boutique", en: "Shop" } },
  { slug: "faq", label: { fr: "FAQ", en: "FAQ" } },
  { slug: "contact", label: { fr: "Contact", en: "Contact" } },
];

export type World = { slug: string; site?: string; name: string; tag: Tx; image: string; color: string; story: Tx; services: { fr: string[]; en: string[] }; shots: string[] };
export const WORLDS: World[] = [
  {
    slug: "soma-experiences", name: "SŌMA Experiences", color: "#c39a5b", image: IMG.hero,
    tag: { fr: "Événementiel & direction créative", en: "Events & creative direction" },
    story: { fr: "Le cœur historique de la maison : des événements conçus comme des récits complets, de l’intention initiale au dernier geste d’hospitalité.", en: "The historic heart of the house: events conceived as complete narratives, from the first intention to the final gesture of hospitality." },
    services: { fr: ["Concept & stratégie", "Direction artistique", "Production & coordination"], en: ["Concept & strategy", "Creative direction", "Production & coordination"] },
    shots: [IMG.hero, IMG.crowd, IMG.performance],
  },
  {
    slug: "vibes-by-soma", site: "vibes", name: "VIBES by SŌMA", color: "#e0773d", image: IMG.foam,
    tag: { fr: "Concepts signature & lifestyle", en: "Signature concepts & lifestyle" },
    story: { fr: "Des rendez-vous signature qui captent l’énergie d’une génération et transforment un lieu en scène sociale, musicale et visuelle.", en: "Signature gatherings that capture a generation’s energy and turn a venue into a social, musical and visual stage." },
    services: { fr: ["Concepts propriétaires", "Programmation", "Expérience de marque"], en: ["Owned concepts", "Programming", "Brand experience"] },
    shots: [IMG.foam, IMG.signage, IMG.toast],
  },
  {
    slug: "soma-bar", name: "SŌMA Bar", color: "#2f7a64", image: IMG.bar,
    tag: { fr: "Cocktails & hospitalité", en: "Cocktails & hospitality" },
    story: { fr: "Une hospitalité mobile où le cocktail, le geste et la mise en scène deviennent une expérience à part entière.", en: "Mobile hospitality where cocktails, gestures and staging become an experience in their own right." },
    services: { fr: ["Carte sur mesure", "Mixologie", "Service & scénographie"], en: ["Bespoke menu", "Mixology", "Service & staging"] },
    shots: [IMG.bar, IMG.bartender, IMG.bottles],
  },
  {
    slug: "soft-glow-shoot", name: "Soft Glow Shoot", color: "#c47d84", image: IMG.fashionClose,
    tag: { fr: "Photographie & image", en: "Photography & image" },
    story: { fr: "Un studio d’image sensible pour portraits, campagnes et récits éditoriaux, avec une direction claire et une lumière maîtrisée.", en: "A sensitive image studio for portraits, campaigns and editorial stories, with clear direction and controlled light." },
    services: { fr: ["Direction photo", "Portrait & campagne", "Post-production"], en: ["Photo direction", "Portrait & campaign", "Post-production"] },
    shots: [IMG.fashionClose, IMG.fashionFull, IMG.portraitWhite],
  },
  {
    slug: "bonnets-land", name: "Bonnets Land", color: "#7d8aa3", image: IMG.portraitBlack,
    tag: { fr: "Objets & collections", en: "Objects & collections" },
    story: { fr: "Un laboratoire d’objets, d’éditions et de collaborations où l’allure SŌMA se prolonge au quotidien.", en: "A laboratory for objects, editions and collaborations where the SŌMA attitude extends into everyday life." },
    services: { fr: ["Collections", "Éditions limitées", "Collaborations"], en: ["Collections", "Limited editions", "Collaborations"] },
    shots: [IMG.portraitBlack, IMG.portraitWhite, IMG.fashionClose],
  },
];

export type Service = { title: Tx; desc: Tx; image?: string };
export const SERVICES: Service[] = [
  { title: { fr: "Conception événementielle", en: "Event design" }, desc: { fr: "De la première intuition à un concept clair, singulier et réalisable.", en: "From an initial intuition to a clear, distinctive and feasible concept." }, image: IMG.crowd },
  { title: { fr: "Direction artistique", en: "Creative direction" }, desc: { fr: "Un langage visuel cohérent pensé pour chaque espace et chaque moment.", en: "A coherent visual language designed for every space and moment." }, image: IMG.signage },
  { title: { fr: "Organisation & coordination", en: "Planning & coordination" }, desc: { fr: "Planning, partenaires, logistique et suivi précis de chaque étape.", en: "Planning, partners, logistics and precise follow-up at every stage." } },
  { title: { fr: "Production événementielle", en: "Event production" }, desc: { fr: "Une exécution fluide avec des équipes et prestataires coordonnés.", en: "Seamless execution with coordinated teams and partners." }, image: IMG.performance },
  { title: { fr: "Communication & contenu", en: "Communication & content" }, desc: { fr: "Identité, narration, contenus et amplification autour de l’expérience.", en: "Identity, storytelling and content around the experience." } },
  { title: { fr: "Expériences bar", en: "Bar experiences" }, desc: { fr: "Carte sur mesure, mixologie, équipe bar et mise en scène.", en: "Bespoke menus, mixology, bar team and staging." }, image: IMG.bar },
  { title: { fr: "Photographie", en: "Photography" }, desc: { fr: "Portraits, reportages et images éditoriales pensées pour durer.", en: "Portraits, reports and editorial images made to last." }, image: IMG.fashionFull },
  { title: { fr: "Concepts personnalisés", en: "Bespoke concepts" }, desc: { fr: "Des formats originaux développés autour de vos objectifs.", en: "Original formats developed around your objectives." }, image: IMG.foam },
];

export type Project = { slug: string; name: string; cat: Tx; year: string; image: string; brief: Tx; gallery: string[] };
export const PROJECTS: Project[] = [
  { slug: "nomo-vibes", name: "Onomo Vibes", year: "2025", image: IMG.signage, cat: { fr: "VIBES · Lifestyle", en: "VIBES · Lifestyle" }, brief: { fr: "La première édition d’Onomo Vibes, un rendez-vous signature VIBES by SŌMA pensé pour rassembler une génération autour de la musique, du style et du partage.", en: "The first edition of Onomo Vibes, a VIBES by SŌMA signature gathering designed to bring a generation together around music, style and sharing." }, gallery: [IMG.crowd, IMG.foam, IMG.toast] },
  { slug: "after-dark", name: "After Dark", year: "2025", image: IMG.performance, cat: { fr: "Expérience musicale", en: "Music experience" }, brief: { fr: "Une nuit construite comme une montée en intensité : lumière, son et scénographie au service de l’énergie.", en: "A night built as a rising crescendo: light, sound and staging serving the energy." }, gallery: [IMG.performance, IMG.hero, IMG.crowd] },
  { slug: "golden-hour", name: "Golden Hour", year: "2025", image: IMG.bartender, cat: { fr: "SŌMA Bar", en: "SŌMA Bar" }, brief: { fr: "Une expérience bar au coucher du soleil, entre mixologie sur mesure et hospitalité attentive.", en: "A sunset bar experience blending bespoke mixology and attentive hospitality." }, gallery: [IMG.bar, IMG.bottles, IMG.toast] },
  { slug: "soft-glow-01", name: "Soft Glow 01", year: "2025", image: IMG.fashionFull, cat: { fr: "Portrait éditorial", en: "Editorial portrait" }, brief: { fr: "Une série de portraits éditoriaux à la lumière douce, pensée comme une signature visuelle.", en: "A series of softly lit editorial portraits, conceived as a visual signature." }, gallery: [IMG.fashionClose, IMG.fashionFull, IMG.portraitWhite] },
];

export const GALLERY = [IMG.hero, IMG.fashionClose, IMG.bar, IMG.toast, IMG.foam, IMG.portraitWhite, IMG.crowd, IMG.bottles, IMG.fashionFull, IMG.editorial, IMG.signage, IMG.performance, IMG.portraitBlack, IMG.bartender];

export type Post = { title: Tx; cat: Tx; image: string; excerpt: Tx };
export const POSTS: Post[] = [
  { title: { fr: "Recevoir autrement : l’art de créer une atmosphère", en: "Hosting differently: the art of creating an atmosphere" }, cat: { fr: "Inspiration", en: "Inspiration" }, image: IMG.signage, excerpt: { fr: "Lumière, rythme, accueil : ce qui fait qu’un lieu devient une expérience.", en: "Light, rhythm, welcome: what turns a venue into an experience." } },
  { title: { fr: "Dans les coulisses d’une expérience SŌMA", en: "Behind the scenes of a SŌMA experience" }, cat: { fr: "Coulisses", en: "Behind the scenes" }, image: IMG.bartender, excerpt: { fr: "De la première réunion au dernier invité, la méthode qui rend tout fluide.", en: "From the first meeting to the last guest, the method that keeps it seamless." } },
  { title: { fr: "Ce que les invités retiennent vraiment", en: "What guests truly remember" }, cat: { fr: "Conseils", en: "Advice" }, image: IMG.toast, excerpt: { fr: "Les détails invisibles qui transforment un bon moment en souvenir.", en: "The invisible details that turn a good moment into a memory." } },
];

export const STEPS: { title: Tx; desc: Tx }[] = [
  { title: { fr: "Écouter", en: "Listen" }, desc: { fr: "Nous prenons le temps de comprendre votre intention, vos invités et ce que vous voulez qu’ils ressentent.", en: "We take time to understand your intention, your guests and what you want them to feel." } },
  { title: { fr: "Imaginer", en: "Imagine" }, desc: { fr: "Un concept, une histoire, une atmosphère : nous posons la direction créative et le parcours invité.", en: "A concept, a story, an atmosphere: we set the creative direction and the guest journey." } },
  { title: { fr: "Concevoir", en: "Design" }, desc: { fr: "Scénographie, lumière, carte, contenus : chaque élément est dessiné, chiffré et validé avec vous.", en: "Staging, light, menu, content: every element is designed, costed and validated with you." } },
  { title: { fr: "Produire", en: "Produce" }, desc: { fr: "Nos équipes et partenaires coordonnent la logistique pour une exécution précise et sereine.", en: "Our teams and partners coordinate logistics for precise, calm execution." } },
  { title: { fr: "Faire vivre", en: "Bring to life" }, desc: { fr: "Le jour J, nous orchestrons chaque instant pour que vous puissiez simplement profiter.", en: "On the day, we orchestrate every moment so you can simply enjoy it." } },
];

export const TESTIMONIALS: { q: Tx; by: Tx; img: string }[] = [
  { q: { fr: "SŌMA a transformé notre intention en une expérience fluide, généreuse et profondément élégante.", en: "SŌMA turned our intention into a fluid, generous and deeply elegant experience." }, by: { fr: "Cliente privée · Conakry", en: "Private client · Conakry" }, img: IMG.portraitWhite },
  { q: { fr: "Une direction précise, une équipe présente et ce supplément d’âme que les invités ressentent immédiatement.", en: "Precise direction, a present team and that extra soul guests feel immediately." }, by: { fr: "Partenaire de production", en: "Production partner" }, img: IMG.editorial },
  { q: { fr: "Tout semblait naturel. Pourtant, chaque lumière, chaque passage et chaque détail avait été orchestré.", en: "Everything felt natural, yet every light, transition and detail had been orchestrated." }, by: { fr: "Invitée · Onomo Vibes", en: "Guest · Onomo Vibes" }, img: IMG.fashionClose },
  { q: { fr: "Le bar SŌMA a été le cœur de notre soirée. Les cocktails, le service, la mise en scène : tout était juste.", en: "The SŌMA bar was the heart of our evening. Cocktails, service, staging: everything was spot on." }, by: { fr: "Événement corporate", en: "Corporate event" }, img: IMG.portraitBlack },
  { q: { fr: "Des photos qui nous ressemblent enfin. Une direction douce, rassurante et très professionnelle.", en: "Photos that finally look like us. Gentle, reassuring and very professional direction." }, by: { fr: "Séance Soft Glow", en: "Soft Glow session" }, img: IMG.fashionFull },
];

export const OFFERS: { name: string; tag: Tx; desc: Tx; items: { fr: string[]; en: string[] }; featured?: boolean }[] = [
  { name: "Essentiel", tag: { fr: "Accompagnement ciblé", en: "Targeted support" }, desc: { fr: "Pour un besoin précis : un bar, un shooting, une direction artistique ou une coordination le jour J.", en: "For a precise need: a bar, a shoot, creative direction or on-the-day coordination." }, items: { fr: ["Un service SŌMA au choix", "Rendez-vous de cadrage", "Proposition détaillée", "Équipe dédiée le jour J"], en: ["One SŌMA service of your choice", "Scoping meeting", "Detailed proposal", "Dedicated team on the day"] } },
  { name: "Signature", tag: { fr: "Le plus demandé", en: "Most requested" }, featured: true, desc: { fr: "La conception et la production complètes de votre événement, de l’idée à la dernière lumière.", en: "Full design and production of your event, from idea to final light." }, items: { fr: ["Concept & direction artistique", "Scénographie & décor", "Organisation & prestataires", "Production & coordination", "Expérience bar en option"], en: ["Concept & creative direction", "Staging & décor", "Planning & suppliers", "Production & coordination", "Bar experience as an option"] } },
  { name: "Sur-mesure", tag: { fr: "Marques & grands formats", en: "Brands & large formats" }, desc: { fr: "Activations de marque, concepts propriétaires et formats d’envergure, pensés avec vos équipes.", en: "Brand activations, owned concepts and large-scale formats, designed with your teams." }, items: { fr: ["Stratégie d’expérience", "Concept propriétaire", "Contenus & communication", "Pilotage multi-équipes"], en: ["Experience strategy", "Owned concept", "Content & communication", "Multi-team management"] } },
];

export const FAQ: { q: Tx; a: Tx }[] = [
  { q: { fr: "Quels types d’événements organisez-vous ?", en: "What kind of events do you produce?" }, a: { fr: "Des événements privés, corporate, célébrations, activations de marque et concepts signature, toujours adaptés à votre intention.", en: "Private and corporate events, celebrations, brand activations and signature concepts, always tailored to your intention." } },
  { q: { fr: "Intervenez-vous uniquement à Conakry ?", en: "Do you only work in Conakry?" }, a: { fr: "Nous sommes basés à Conakry et pouvons étudier des projets partout en Guinée ainsi qu’à l’international.", en: "We are based in Conakry and can consider projects across Guinea and internationally." } },
  { q: { fr: "Combien de temps à l’avance faut-il réserver ?", en: "How far ahead should I book?" }, a: { fr: "Idéalement de 6 à 16 semaines selon l’ampleur du projet. Pour les demandes plus courtes, contactez-nous : nous ferons notre possible.", en: "Ideally 6 to 16 weeks depending on the scale of the project. For shorter timelines, reach out and we’ll do our best." } },
  { q: { fr: "Proposez-vous la décoration ?", en: "Do you provide décor?" }, a: { fr: "Oui. Nous concevons la direction artistique, le décor et la scénographie.", en: "Yes. We design the creative direction, décor and staging." } },
  { q: { fr: "Peut-on réserver uniquement certains services ?", en: "Can I book selected services only?" }, a: { fr: "Oui. Notre accompagnement peut être global ou ciblé : bar, photographie, direction artistique ou coordination.", en: "Yes. Our support can be end-to-end or targeted: bar, photography, creative direction or coordination." } },
  { q: { fr: "Comment demander un devis ?", en: "How do I request a quote?" }, a: { fr: "Utilisez le formulaire de contact, la réservation guidée ou écrivez-nous directement sur WhatsApp.", en: "Use the contact form, the guided booking or message us directly on WhatsApp." } },
  { q: { fr: "Comment fonctionnent les paiements ?", en: "How do payments work?" }, a: { fr: "Un acompte confirme la prestation. L’échéancier dépend ensuite du projet.", en: "A deposit confirms the booking. The payment schedule then depends on the project." } },
];

export const PRODUCTS = [
  { name: "Bonnet Signature", price: "320 000 GNF", img: IMG.portraitBlack, tag: { fr: "Signature", en: "Signature" } },
  { name: "Édition SŌMA No. 01", price: "410 000 GNF", img: IMG.fashionClose, tag: { fr: "Édition limitée", en: "Limited edition" } },
  { name: "Bonnets Land Classic", price: "280 000 GNF", img: IMG.portraitWhite, tag: { fr: "Signature", en: "Signature" } },
];
