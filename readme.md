# Trattoria Aurora — Landing Page

Ce projet fournit une page vitrine Next.js optimisée SEO pour mettre en avant la Trattoria Aurora, un restaurant italien premium.

L'interface est conçue avec [Chakra UI](https://chakra-ui.com) pour bénéficier d'un système de design accessible, responsive et rapidement personnalisable.

## Démarrer

```bash
npm install
npm run dev
```

L'application est ensuite accessible sur [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` : lance le serveur de développement.
- `npm run build` : génère la version de production.
- `npm run start` : démarre le serveur en mode production.
- `npm run lint` : exécute le linter Next.js.

## Structure

- `app/` : composants App Router (mise en page, page d'accueil et styles globaux).
- `components/` : composants React clients et logiques d'interaction.
- `next.config.mjs` : configuration Next.js (optimisation des images distantes).
- `theme/` : personnalisation du thème Chakra UI (palette, typographies, variantes de boutons).
