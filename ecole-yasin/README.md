# École Ya-Sin

École Ya-Sin est une application Next.js (App Router) pensée pour le suivi de la mémorisation du Coran. Le projet inclut Tailwind CSS pour l'interface, NextAuth pour l'authentification par email/mot de passe et une connexion MongoDB prête pour recevoir de vraies données.

## 🚀 Démarrage rapide

```bash
cp .env.example .env.local # puis renseignez les valeurs
npm install
npm run dev
```

Le serveur de développement est disponible sur [http://localhost:3000](http://localhost:3000).

## 🔧 Variables d'environnement

Créez un fichier `.env.local` à partir de l'exemple suivant :

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change-me
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=ecole-yasin
```

Ajoutez au moins un utilisateur master directement en base (ou via un script) puis utilisez le dashboard master pour créer des élèves. Les mots de passe sont hachés avec bcrypt.

## 🗂️ Structure du projet

```
ecole-yasin/
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # Configuration NextAuth credentials
│   ├── layout.tsx                       # Layout global avec SessionProvider
│   ├── login/                           # Page + formulaire de connexion
│   ├── master/                          # Dashboards master et server actions
│   └── student/                         # Tableau de bord élève et actions associées
├── components/                          # Header, Footer, cartes, providers…
├── lib/                                 # Connexion Mongo, helpers auth, liste de sourates
├── middleware.ts                        # Protection des routes master/student
├── types/                               # Types TypeScript partagés (Session, Progress…)
├── tailwind.config.ts                   # Configuration Tailwind CSS
├── tsconfig.json                        # Aliases, strict mode, types NextAuth
└── README.md
```

## 📄 Pages disponibles

- `/` : accueil et présentation de l'école
- `/login` : connexion via NextAuth (credentials email + mot de passe)
- `/master/dashboard` : liste des élèves du master et formulaire d'inscription
- `/master/student/[id]` : fiche détaillée d'un élève, mise à jour de la progression et commentaires
- `/student/dashboard` : vue élève avec progression personnelle et derniers retours du master

## ✨ Fonctionnalités clés

- Authentification credentials avec NextAuth + bcrypt
- Connexion MongoDB/Mongoose (`lib/mongodb.ts`, modèles `User` et `Progress`)
- Actions serveur Next.js pour créer un élève et mettre à jour les progrès master/élève
- Tableaux de bord dynamiques basés sur les données récupérées côté serveur
- Interface Tailwind responsive et composants commentés pour faciliter l'apprentissage

## ✅ À savoir

- Aucun jeu de données n'est fourni : utilisez MongoDB Atlas ou une instance locale pour créer vos comptes.
- Les server actions déclenchent un `revalidatePath` pour rafraîchir les dashboards après chaque mise à jour.
- Le middleware NextAuth protège toutes les routes `/master/*` et `/student/*`.

Bonne construction de votre école coranique en ligne !
