Tu vas construire mon portfolio personnel d'administrateur systèmes à partir d'une maquette haute fidélité.

Lis d'abord `README.md` en entier (spécification complète), puis ouvre les fichiers de `reference/` dans un navigateur pour voir le rendu attendu. Ces fichiers HTML sont des **références de design**, pas du code à copier : recrée-les proprement.

Stack imposée :
- Astro (dernière version stable) + TypeScript, site 100 % statique.
- CSS : un fichier `tokens.css` (variables CSS) + CSS scopé par composant Astro. Pas de Tailwind, pas de framework UI.
- JS client minimal, en TypeScript vanilla, uniquement pour : terminal interactif, carrousel, marquee, révélations au scroll, filtres (Projets, Veille), vague du damier CTA, mascotte.
- Contenu en Markdown via les Content Collections d'Astro : `src/content/projets/*.md` et `src/content/veille/*.md` (frontmatter typé avec Zod).
- Pixel art : porte `reference/pixel.js` en module TS qui génère des SVG **au build** (composant `<PixelArt art="infra" ramp="blue" px={8} />`), sauf la mascotte animée et l'effet de survol.
- View Transitions natives d'Astro (`<ClientRouter />`) pour les fondus entre pages.
- Déploiement : `Dockerfile` multi-stage (build Node → nginx:alpine) + `docker-compose.yml`, prêt pour mon homelab derrière un reverse proxy.

Pages à livrer : `/` (Accueil, thèmes clair et sombre), `/projets` (filtre par domaine via `?domaine=`), `/projets/[slug]` (étude de cas), `/veille` (filtre par sujet via `?sujet=`), `/composants` (planche interne, `noindex`), `404`.

Exigences non négociables :
- Responsive de 360 px à 1920 px ; vérifier 390 et 1440.
- `prefers-reduced-motion` respecté partout (aucune animation, terminal sans effet de frappe, mascotte figée).
- Accessibilité AA : texte courant en `--ink`, jamais d'orange `#FA500F` pour du texte courant ; focus visible ; terminal utilisable au clavier et annoncé (`aria-live="polite"` sur la sortie).
- Lighthouse ≥ 95 sur les 4 catégories ; polices Geist / Geist Mono auto-hébergées (`@fontsource`), `font-display: swap`.
- SEO : balises meta, Open Graph, `sitemap.xml`, `robots.txt`, données structurées `Person`.
- Thème sombre : bascule manuelle (bouton dans la nav) + respect de `prefers-color-scheme`, mémorisé en `localStorage`.

Procède par étapes et montre-moi le résultat à chaque fin d'étape :
1. Scaffold Astro, tokens, polices, layout de base, nav + footer.
2. Module pixel art + planche `/composants`.
3. Accueil complet (dont terminal).
4. `/projets`, `/projets/[slug]`, `/veille` + collections de contenu.
5. Thème sombre, animations, accessibilité, SEO, Docker.

Toutes les valeurs (couleurs, tailles, espacements, textes) sont dans `README.md` : respecte-les à la lettre. Si une information manque, demande-moi plutôt que d'inventer.
