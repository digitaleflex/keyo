# Keyo 🔒

**Keyo** est un générateur de mots de passe en ligne moderne, sécurisé et élégant. Conçu avec une interface "Premium" en glassmorphism, il allie robustesse cryptographique et expérience utilisateur fluide.

![Keyo Preview](./public/placeholder-logo.png)

## ✨ Fonctionnalités

*   **Génération Sécurisée** : Algorithmes robustes pour créer des mots de passe incassables.
*   **Personnalisation Complète** : Choix de la longueur, inclusion de symboles, chiffres, lettres, exclusion de caractères similaires.
*   **Interface Premium** : Design moderne avec effets de verre (Glassmorphism), animations fluides et thèmes sombres profonds.
*   **Actualités Tech & Sécurité** : Flux RSS intégrés (ZATAZ, Korben) pour rester informé des dernières menaces et nouveautés.
*   **Conseils de Sécurité** : Guide intégré sur les bonnes pratiques (2FA, gestionnaires, etc.).

## 🛠️ Stack Technique

*   **Framework** : [Next.js 15](https://nextjs.org/) (App Directory)
*   **Langage** : [TypeScript](https://www.typescriptlang.org/)
*   **Styling** : [Tailwind CSS v4](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/)
*   **Icônes** : [Lucide React](https://lucide.dev/)
*   **RSS** : `rss-parser` pour l'agrégation de news

## 🚀 Installation & Démarrage

1.  **Cloner le dépôt**
    ```bash
    git clone https://github.com/digitaleflex/keyo.git
    cd keyo
    ```

2.  **Installer les dépendances**
    ```bash
    pnpm install
    # ou
    npm install
    ```

3.  **Lancer le serveur de développement**
    ```bash
    pnpm dev
    ```

4.  Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Build & Production

Pour créer une version de production optimisée :

```bash
pnpm build
pnpm start
```

## 📄 Licence

Ce projet est sous licence MIT.

---
*Développé avec ❤️ pour la sécurité de vos données.*
