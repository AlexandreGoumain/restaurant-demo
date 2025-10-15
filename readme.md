# Restaurant Demo - Site Web pour Restaurant Italien

Un site web moderne et élégant pour restaurant italien, développé avec Next.js, Chakra UI et TypeScript. Ce projet présente une interface complète pour les clients avec un système de réservations, et un menu interactif.

## Fonctionnalités

- **Page d'accueil attrayante** avec présentation du restaurant
- **Menu interactif** avec catégories et plats détaillés
- **Système de réservations** en ligne
- **Témoignages clients** pour renforcer la confiance
- **Section entreprises** pour les événements et groupes
- **Contact facile** avec formulaire de contact
- **Design responsive** adapté à tous les appareils

## 🛠️ Stack Technique

- **Framework**: [Next.js 15](https://nextjs.org/) avec App Router
- **UI Library**: [Chakra UI](https://chakra-ui.com/) pour un design moderne
- **Langage**: TypeScript pour la sécurité du typage
- **Styling**: Emotion (intégré avec Chakra UI)
- **Gestion d'état**: React Query pour la gestion des données
- **Animations**: Framer Motion
- **ICÔNES**: React Icons

## 📁 Structure du Projet

```
src/
├── app/                    # Pages Next.js avec App Router
│   ├── api/               # Routes API (backend)
│   │   └── public/        # API publiques (menu, réservations, etc.)
│   ├── contact/           # Page de contact
│   ├── entreprises/       # Page pour entreprises
│   ├── menu/              # Page du menu
│   └── reservation/       # Page de réservation
├── components/            # Composants React réutilisables
├── lib/                  # Utilitaires et configuration
├── types/                # Définitions de types TypeScript
└── theme/                # Configuration du thème Chakra UI
```

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

1. Cloner le projet :
```bash
git clone [URL_DU_PROJET]
cd restaurant-demo
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer le serveur de développement :
```bash
npm run dev
```

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Scripts Disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build pour production
- `npm run start` - Serveur de production
- `npm run lint` - Linter ESLint

## 🔧 Configuration

Le projet utilise Chakra UI avec une configuration personnalisée dans `src/theme/index.ts`. Les couleurs et styles peuvent être facilement modifiés dans ce fichier.

## 📱 Pages Principales

- **Accueil** (`/`) - Présentation du restaurant avec réservation rapide
- **Menu** (`/menu`) - Menu interactif avec catégories
- **Réservation** (`/reservation`) - Formulaire de réservation
- **Entreprises** (`/entreprises`) - Services pour entreprises et événements
- **Contact** (`/contact`) - Formulaire de contact et informations

## 🎨 Design et UX

- **Design moderne** avec Chakra UI
- **Images optimisées** avec Next.js Image
- **Animations fluides** avec Framer Motion
- **Schema.org** pour le SEO
- **Responsive design** pour mobile et desktop

## 📝 API Endpoints

- `GET /api/public/menu` - Récupérer le menu
- `POST /api/public/reservations` - Créer une réservation
- `POST /api/public/leads` - Créer un prospect entreprise

## 🤝 Contribuer

1. Forker le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Committer les changements (`git commit -m 'Add amazing feature'`)
4. Pusher vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.
