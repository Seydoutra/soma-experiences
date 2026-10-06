# SŌMA Experiences

Site vitrine bilingue (FR / EN) de **SŌMA Experiences**, maison créative et agence événementielle basée à Conakry, fondée par Catherine Soumah.

## Stack

- [Next.js](https://nextjs.org) (App Router, export statique) + React + TypeScript
- [Motion](https://motion.dev) pour les animations, [Lenis](https://lenis.darkroom.engineering) pour le défilement fluide
- CSS sur mesure (`app/globals.css`), polices Manrope et Instrument Serif
- Hébergement GitHub Pages

## Structure

```
app/                 layout, routes statiques FR/EN, sitemap, robots
components/
  soma-site.tsx      routeur client (langue, page, détail)
  soma/data.ts       contenus bilingues, univers, projets, événement, liens
  soma/motion.tsx    primitives d'animation (révélations, marquee, compteur…)
  soma/chrome.tsx    en-tête, menu mobile, pied de page, boutons
  soma/home.tsx      sections de la page d'accueil
  soma/pages.tsx     pages intérieures (à propos, services, univers, contact…)
  soma/event.tsx     événement à venir : compte à rebours, billetterie
public/images/       visuels
```

## Développement

```bash
npm install
npm run dev
```

Le prochain événement (date, lien de billetterie) se met à jour dans `components/soma/data.ts` (`EVENT`). Les blocs événement disparaissent automatiquement une fois la date passée.

## Publication

Chaque push sur `main` déclenche la compilation et le déploiement sur GitHub Pages.
