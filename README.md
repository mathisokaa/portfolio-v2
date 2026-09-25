# Portfolio — administrateur systèmes

Site statique Astro + TypeScript, recréé à partir de la maquette haute fidélité de `docs/design_handoff_portfolio/` (spécification complète dans son `README.md`).

## Commandes

| Commande | Action |
|---|---|
| `npm install` | Dépendances |
| `npm run dev` | Serveur de dev sur `localhost:4321` |
| `npm run build` | `astro check` + build statique dans `dist/` |
| `npm run preview` | Sert `dist/` |
| `docker compose up -d --build` | Build multi-stage → nginx:alpine, exposé sur `127.0.0.1:8080` |

## Pages

`/` (thèmes clair et sombre) · `/projets?domaine=infra|backup|reseau|auto` · `/projets/[slug]` (étude de cas) · `/veille?sujet=…` · `/composants` (planche interne, `noindex`) · `404`.

## Où modifier quoi

- **Identité, liens, email, CV** : `src/data/site.ts` (placeholders « Prénom Nom »). Déposer le CV dans `public/cv.pdf`.
- **Projets** : un fichier par projet dans `src/content/projets/*.md`. Le champ `etude` (voir `migration-unraid-proxmox.md`) génère la page d'étude de cas ; sans lui, la carte affiche « Étude de cas — bientôt ». Le corps Markdown alimente la section Contexte.
- **Veille** : une entrée = `src/content/veille/AAAA-MM-JJ-slug.md` (frontmatter `date`, `sujet`, `titre`, `source`, `url` ; corps = « À retenir »). La date de mise à jour et la numérotation sont calculées. Radar, sujets et sources : `src/data/veille.ts`. Les entrées actuelles sont des **exemples**.
- **Accueil** (news, parcours, métiers, stack du marquee) : `src/data/accueil.ts`. Dates du parcours à confirmer.
- **Domaines** (en-têtes de `/projets`) : `src/data/domaines.ts`.
- **Tokens** (couleurs, thème sombre, typo) : `src/styles/tokens.css`.
- **Pixel art** : `src/lib/pixel.ts` (port de `pixel.js`), rendu au build via `<PixelArt art="infra" ramp="blue" px={8} />`.

## Déploiement

`Dockerfile` (node:22-alpine → nginx:alpine, port 8080) + `nginx.conf` (gzip, cache long sur `/_astro/`, en-têtes de sécurité, 404) + `docker-compose.yml` (lecture seule, exposé en local pour le reverse proxy). Penser à mettre la vraie URL dans `SITE.url` (canonical, Open Graph, sitemap).
