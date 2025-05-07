# Système de Gestion de Bibliothèque

Cette application est un système complet de gestion de bibliothèque avec une architecture full-stack utilisant Spring Boot (Java) pour le backend et React.js pour le frontend.

## Fonctionnalités

- Authentification et autorisation basées sur les rôles (utilisateur/administrateur)
- Opérations CRUD complètes sur les livres
- Recherche de livres par titre, auteur et catégorie
- Interface utilisateur responsive et intuitive
- Sécurité avec JWT (JSON Web Tokens)

## Technologies utilisées

### Backend
- Java 11
- Spring Boot 2.7.8
- Spring Security
- Spring Data JPA
- MySQL/PostgreSQL
- JWT pour l'authentification

### Backend (Spring Boot)

1. Cloner le dépôt
   ```bash
   git clone https://github.com/votreusername/library-management.git
   cd library-management/backend
   ```

3. Construire et exécuter l'application
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   Le serveur backend sera accessible à l'adresse http://localhost:8080

## API Endpoints

### Authentification
- POST `/api/auth/signup` : Inscription
- POST `/api/auth/signin` : Connexion

### Livres (nécessite authentification)
- GET `/api/books` : Liste tous les livres
- GET `/api/books/{id}` : Obtient un livre par son ID
- GET `/api/books/search/title?title=XX` : Recherche les livres par titre
- GET `/api/books/search/author?author=XX` : Recherche les livres par auteur
- GET `/api/books/search/category?category=XX` : Recherche les livres par catégorie
- POST `/api/books` : Ajoute un nouveau livre (USER, ADMIN)
- PUT `/api/books/{id}` : Met à jour un livre (USER, ADMIN)
- DELETE `/api/books/{id}` : Supprime un livre (ADMIN seulement)