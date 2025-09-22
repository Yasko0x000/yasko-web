# École Ya-Sin

École Ya-Sin est un squelette d'application Next.js (App Router) conçu pour le suivi de la mémorisation du Coran. Le projet repose sur Tailwind CSS pour le design et prépare l'intégration d'une authentification différenciant les comptes *master* (professeurs) des comptes *élève*.

## 🚀 Démarrer le projet

```bash
npm install
npm run dev
```

Le serveur de développement est disponible sur [http://localhost:3000](http://localhost:3000).

## 🗂️ Structure du projet

```
ecole-yasin/
├── app/
│   ├── globals.css          # Styles globaux + Tailwind
│   ├── layout.tsx           # Layout principal avec Header et Footer
│   ├── page.tsx             # Page d'accueil
│   ├── login/page.tsx       # Page de connexion
│   ├── master/
│   │   ├── dashboard/page.tsx     # Tableau de bord master (liste + ajout d'élèves)
│   │   └── student/[id]/page.tsx  # Détail d'un élève
│   └── student/dashboard/page.tsx # Tableau de bord élève
├── components/              # Composants réutilisables (Header, Footer, cartes…)
├── hooks/                   # Hooks personnalisés (ex. détection du rôle via l'URL)
├── lib/                     # Données mockées et configuration de navigation
├── public/                  # Dossier pour les assets statiques
├── types/                   # Types TypeScript partagés
├── package.json             # Dépendances et scripts
├── tailwind.config.ts       # Configuration Tailwind CSS
├── postcss.config.js        # Configuration PostCSS
├── next.config.mjs          # Configuration Next.js
└── README.md
```

## 📄 Pages disponibles

- `/` : accueil avec présentation de l'École Ya-Sin et bouton de connexion.
- `/login` : formulaire de connexion (sans logique d'authentification, à brancher ultérieurement).
- `/master/dashboard` : interface master avec liste des élèves et formulaire d'inscription manuelle.
- `/master/student/[id]` : fiche détaillée d'un élève pour gérer ses progrès et commentaires.
- `/student/dashboard` : vue élève avec progression personnelle, rappels et commentaires du master.

## 🔒 Authentification (préparation)

- Les comptes sont scindés en deux rôles : **master** et **élève**.
- Seuls les masters peuvent inscrire de nouveaux élèves (formulaire dédié dans le dashboard master).
- La navigation s'adapte automatiquement au rôle détecté via l'URL grâce au hook `useRole` et à la configuration située dans `lib/navigation.ts`.

## 🧱 Évolutions prévues

- Intégration d'une vraie base de données (MongoDB) pour stocker élèves, progrès, commentaires et rappels.
- Mise en place d'une authentification sécurisée (ex. NextAuth.js) et de middlewares de protection des routes.
- Connexion des formulaires à des actions serveur ou APIs REST/GraphQL.

Ce squelette fournit une base solide et modulable pour construire l'application complète École Ya-Sin.
