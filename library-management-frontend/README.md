# Frontend - Application de Gestion de Bibliothèque

Ce frontend React fournit une interface utilisateur pour notre système de gestion de bibliothèque.

## Technologies utilisées

- React 18
- React Router v6 pour la navigation
- Axios pour les appels API
- React Bootstrap pour les composants UI
- React Hook Form pour la gestion des formulaires
- Context API pour la gestion de l'état d'authentification

## Installation

1. Assurez-vous d'avoir Node.js (version 14 ou supérieure) installé sur votre système.

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez la connexion au backend :
   - Par défaut, le frontend est configuré pour communiquer avec le backend via le proxy dans package.json qui pointe vers http://localhost:8080
   - Si votre backend est sur un autre port ou serveur, modifiez la propriété "proxy" dans package.json

4. Lancez l'application en mode développement :
   ```bash
   npm start
   ```
   Cela démarrera l'application sur http://localhost:3000

## Structure du projet

```
src/
├── components/        # Composants React
│   ├── BookDetails.js # Affichage détaillé d'un livre
│   ├── BookForm.js    # Formulaire d'ajout/édition de livre
│   ├── BookList.js    # Liste des livres
│   ├── Home.js        # Page d'accueil
│   ├── Login.js       # Formulaire de connexion
│   ├── NavigationBar.js # Barre de navigation
│   ├── NotFound.js    # Page 404
│   ├── Profile.js     # Profil utilisateur
│   ├── ProtectedRoute.js # Route protégée requérant authentification
│   └── Register.js    # Formulaire d'inscription
├── context/
│   └── AuthContext.js # Contexte d'authentification
├── services/
│   ├── AuthHeader.js  # Utilitaire pour les en-têtes d'authentification
│   ├── AuthService.js # Service d'authentification
│   └── BookService.js # Service pour les opérations sur les livres
├── App.js             # Composant principal et configuration des routes
└── index.js           # Point d'entrée de l'application
```

## Fonctionnalités

### Authentification
- Inscription de nouveaux utilisateurs
- Connexion avec nom d'utilisateur et mot de passe
- Stockage du JWT pour maintenir la session
- Déconnexion

### Gestion des livres
- Affichage de la liste des livres
- Recherche par titre, auteur ou catégorie
- Ajout de nouveaux livres
- Modification des livres existants
- Suppression de livres (accessible uniquement aux administrateurs)
- Affichage détaillé des informations d'un livre

### Sécurité
- Routes protégées nécessitant une authentification
- Fonctionnalités spécifiques aux administrateurs
- JWT pour sécuriser les communications avec le backend

## Construction pour la production

Pour créer une version optimisée pour la production :

```bash
npm run build
```

Cela génère une version optimisée de l'application dans le dossier `build/` que vous pouvez déployer sur un serveur web.