# Handoff — Portfolio administrateur systèmes

## Vue d'ensemble
Portfolio personnel d'un administrateur systèmes (Windows Server, Hyper-V, AD, Veeam) en ESN, passionné de Linux, conteneurs et homelab. Objectif : être repéré par des recruteurs tech et prouver que je conçois, sécurise et opère de l'infrastructure réelle. Langue : français. Ton : direct, concret, factuel, sans jargon marketing.

## À propos des fichiers de design
Les fichiers de `reference/` sont des **maquettes HTML** (prototypes montrant l'aspect et le comportement attendus), pas du code de production. Ils s'ouvrent directement dans un navigateur (`support.js` doit rester à côté). La tâche est de **les recréer** dans la stack décrite dans `PROMPT.md` (Astro + TS).

## Fidélité
**Haute fidélité.** Couleurs, typographie, espacements, textes et interactions sont définitifs. Reproduire au pixel près.

---

## Principes de direction artistique
1. **Retenue + un seul événement.** Interface sobre (crème, encre, beaucoup d'air). La couleur chaude arrive par grands aplats en dégradé sunset à des moments choisis uniquement : panneau du hero, bande séparatrice, CTA final, panneau hero de la Veille, bandeau « Projet suivant ».
2. **Le pixel comme système.** Illustrations et icônes en pixel art sur grille 20×20 (icône 160×160 = modules de 8 px), SVG `shape-rendering: crispEdges`.
3. **La grille visible.** Damiers de carrés séparés par des filets de 1 px, micro-labels mono en capitales posés dans les cases (certains en `writing-mode: vertical-rl`), arcs de cercle très fins en filigrane (div `border-radius:50%` + `border:1px`).
4. **Matière.** Grain (bruit SVG `feTurbulence`) sur tous les aplats en dégradé, `mix-blend-mode: overlay`, opacité 0.45–0.55, tuile 180 px.

---

## Design tokens

### Couleurs
| Token | Valeur | Usage |
|---|---|---|
| `--ink` | `#151524` | texte, wordmark, fonds sombres (jamais de noir pur) |
| `--cream` | `#F2F1E8` | fond principal |
| `--paper` | `#FFFFFF` | cartes |
| `--soft` | `#EAE9DF` | fonds de panneaux d'illustration |
| `--muted` | `#4A4A5C` | texte secondaire (sur crème) |
| `--muted-dark` | `#A9A89F` / `#B4B3AA` | texte secondaire sur encre |
| `--line` | `rgba(21,21,36,.10)` | filets 1 px |
| `--line2` | `rgba(21,21,36,.22)` | bordures de boutons secondaires |
| `--note` | `#B9DAFF` (défaut) | couleur d'appoint (catégorie Auto & IA, radar « À surveiller ») — alternatives validées : `#94EACC`, `#FEC63A`, `#E3DCC8` |

Dégradé **sunset** : `#FFAF01 → #FF8204 → #FA500F → #E61300 → #C4001D`.
- Hero : `linear-gradient(165deg, #FFAF01 0%, #FF8204 30%, #FA500F 58%, #E61300 82%, #C4001D 100%)`
- CTA final : `linear-gradient(30deg, #C4001D 0%, #E61300 32%, #FA500F 58%, #FF8204 80%, #FFAF01 100%)` (le rouge profond est en bas à gauche, sous le titre blanc, pour le contraste)

Rampes pixel art (4 tons, foncé → clair) :
- `sunset` (sécurité) : `#C4001D #FA500F #FF8204 #FFAF01`
- `blue` (réseau / infra) : `#044298 #0082E6 #55B3FB #B9DAFF`
- `green` (supervision / backup) : `#005737 #318E68 #44BA82 #94EACC`
- `pop` (auto & IA) : `#C4001D var(--note) #FEC63A #FFFFFF`
- `ink` (monochrome) : `#151524 #3C3C52 #7C7C90 #BDBDC6`
- Fixes : ambre `#FEC63A`, blanc, encre.

**Accessibilité** : `#FA500F` sur crème ≈ 3:1 → réservé aux grands titres, icônes, flèches `→`, puces carrées. Le texte courant reste `--ink`. Les liens texte au survol : soulignement orange 2 px (`text-decoration-color:#FA500F; text-underline-offset:5px`), le texte reste encre. Lien actif de la nav : carré orange 6×6 devant le libellé.

### Thème sombre (variante de l'accueil, à généraliser)
`--bg #151524`, `--fg #F2F1E8`, `--card #1C1C2E`, `--soft #212134`, `--line rgba(242,241,232,.10)`, `--line2 rgba(242,241,232,.24)`, `--muted #B4B3AA`, bouton primaire inversé (`bg #F2F1E8`, texte `#151524`), section homelab `#0E0E1A`.

### Typographie
- **Geist** (400/500/600) : titres et UI. **Geist Mono** (400/500) : micro-labels, métadonnées, terminal.
- Display H1 : `clamp(54px, 7.2vw, 112px)`, 500, line-height .93, letter-spacing -.045em. Toujours 2 lignes courtes terminées par un point (« Infra solide. / Sous contrôle. »).
- H2 : `clamp(40px, 5vw, 72px)`, 500, lh .98, ls -.04em, 2 lignes.
- H3 bloc : `clamp(32px, 3.2vw, 46px)`, 500, lh 1, ls -.035em.
- Titre carte : `clamp(22px, 2vw, 27px)`, 500, lh 1.12, ls -.03em, `text-wrap: balance`.
- Corps : 17 px / 1.5 ; sous-titre hero `clamp(17px, 1.4vw, 20px)`.
- Micro-label : Geist Mono 11 px (10.5 dans les cases), capitales, ls .08em, couleur `--muted`.
- Chaque ligne de titre est enveloppée dans `<span style="display:block;overflow:hidden;padding-bottom:.07em"><span data-rl>…</span></span>` pour l'animation de révélation.

### Formes
- Radius : 8 px (cartes, panneaux), 6 px (boutons, chips), 4 px (tags). Jamais de pilule.
- Bordures : 1 px `--line`. Ombre uniquement sur cartes flottantes / survol : `0 28px 48px -28px rgba(21,21,36,.35)`. Terminal : `0 32px 64px -24px rgba(21,21,36,.55), 0 10px 24px -12px rgba(21,21,36,.35)`. Aucun glassmorphism.
- Conteneur : `max-width:1440px`, padding latéral `clamp(20px, 4vw, 56px)`.
- Boutons : hauteur 40 (nav) / 48 (hero) / 52 (CTA), padding 0 16–22 px, 14–16 px 500. Primaire : fond `--ink`, texte crème, flèche `→` en `#FF8204`. Secondaire : transparent, bordure `--line2`. Survol primaire : opacité .86. Focus : `box-shadow: 0 0 0 2px #F2F1E8, 0 0 0 4px #0082E6`.

---

## Pixel art (voir `reference/pixel.js` — source de vérité)
Porter la bibliothèque telle quelle : primitives `R` (rect), `P` (pixel), `L` (Bresenham), `C` (disque), grilles 20×20 (mascotte 16×16). Arts : `emblem`, `infra`, `backup`, `lock`, `chip`, `migrate`, `network`, `ticket`, `firmware`, `wipe`, `loupe`, `mascot-a/b/c`.
- Rendu : SVG `viewBox="0 0 w h"`, largeur = w × px, runs horizontaux fusionnés en `<rect>`.
- `variant` : `color` (défaut), `ink`, `white`, `cream`. Emblème en `color` = dégradé sunset par bandes de lignes (5 bandes, ambre en haut → rouge en bas).
- Option `grid` : filets de construction (planche composants).
- **Emblème** : baie serveur 3U avec un prompt `>_` découpé dans l'unité haute, deux pieds. Déclinaisons sunset (défaut), encre, blanc. Wordmark « Prénom Nom » Geist 600, ls -.02em, `--ink` uniquement (crème en sombre).
- **Mascotte** : petit robot-serveur 16×16, séquence `a → b → a → c` à 4 i/s (b = saut + regard, c = clignement). Figée sur `a` si reduced-motion.
- **Survol carte** : l'illustration passe de `grayscale(1) contrast(1.1); opacity .62` à la couleur, 500 ms `cubic-bezier(.16,1,.3,1)`, déclenché par le survol / focus de la carte parente.

Domaines → art / rampe : Infra `infra`/blue · Sauvegarde `backup`/green · Réseau & sécu `lock`/sunset · Auto & IA `chip`/pop.

---

## Écrans

### 1. Accueil (`reference/Accueil.dc.html`)
1. **Nav** sticky, fond crème, filet bas. Gauche : emblème 32 px + wordmark 17 px. Centre : Projets (`/projets`), Homelab (`/#homelab`), Parcours (`/#parcours`), Veille (`/veille`), Contact (`/#contact`), 15 px, gap 32. Droite : bouton secondaire « CV » + mono « PDF », primaire « Me contacter ». < 900 px : bouton « Menu » (2 barres) ouvrant un panneau de liens 22 px + 2 boutons pleine largeur.
2. **Hero** (flex wrap, gap `clamp(32px,4vw,56px)`) :
   - Gauche (flex 1 1 440) : micro-label avec carré vert `#44BA82` « Administrateur systèmes — ouvert aux opportunités », H1 « Infra solide. / Sous contrôle. », sous-titre « Je conçois, sécurise et opère des infrastructures Windows et Linux — en production chez les clients de mon ESN, et sur mon homelab réparti sur trois sites. », boutons « Me contacter → » / « Voir les projets ». En bas : grille de 3 cases à filets (Poste · Admin sys · ESN / Socle · Windows · Hyper-V · AD / À côté · Linux · Docker · k3s).
   - Droite (flex 1.1 1 520) : panneau sunset radius 8 + grille blanche 80 px à 20 % + 2 arcs + grain. Micro-labels encre « Fig. 00 — Terminal » (haut gauche), « Essayez : help » (haut droite), vertical blanc « SSH · port 22 · session invitée ». Terminal dedans, hauteur `clamp(400px,38vw,470px)`.
   - Sous le hero : 4 cartes news fines (paper, radius 6, padding 16/18) : type + date mono en haut, texte 15 px 500 + flèche orange.
3. **Marquee technos** entre deux filets : micro-label « 01 — Stack du quotidien », puis Windows Server · Hyper-V · Active Directory · Veeam · Proxmox · Docker · k3s · Tailscale · Linux · GLPI · Home Assistant, `clamp(24px,2.6vw,34px)` 500, séparés par un carré 10 px `--ink`. Liste dupliquée, translateX 0 → -50 % en 60 s linéaire infini, pause au survol. **À faire : remplacer les noms par des logos SVG monochromes `--ink`** (placeholder texte en attendant).
4. **Projets phares** (`#projets`) : « 02 — Projets phares », H2 « Des projets réels. / En production. », à droite lien « Tous les projets → », compteur mono « 01 / 06 », boutons carrés 48 px ← (secondaire) → (primaire, flèche orange). Carrousel horizontal `scroll-snap-type:x mandatory`, cartes `flex:0 0 min(500px,84vw)`, gap 20, aligné sur le conteneur. Carte : zone illustration ratio 5/4 fond `--soft` + grille 25 %×20 % + arc + « Fig. 02.x » + légende bas droite + pixel art px 11 ; corps : catégorie mono avec carré couleur, titre, phrase d'impact muted, pied avec filet haut, méta mono + `→` orange. Survol : translateY(-6px) + ombre + illustration en couleur.
5. **Bande séparatrice** : 20 cases de 16 px de haut en paliers sunset (4 ambre, 4 `#FF8204`, 4 `#FA500F`, 4 `#E61300`, 4 `#C4001D`).
6. **Ce que je fais** : « 03 — Ce que je fais », H2 « Quatre métiers. / Un seul standard. ». 4 articles (radius 8, bordure, fond paper) en flex wrap, visuel + texte chacun `flex:1 1 420px` ; articles 2 et 4 en `row-reverse` (visuel toujours en premier sur mobile). Visuel : fond `--soft`, grille 25 %, arc, 3 micro-labels (Fig. 03.x, légende, vertical « Infra — 01 »…), pixel art px 11. Texte : label « 0x / Domaine », H3, phrase, 5 puces (carré 6 px couleur du domaine, filets entre lignes), lien fléché vers `/projets?domaine=…`.
   - Infra : « Des hôtes qui tiennent. » — Windows Server 2019 à 2025 · Hyper-V et Proxmox VE · Active Directory, GPO, DNS / DHCP · Stockage ZFS · Cycle de vie HPE ProLiant → `?domaine=infra`
   - Sauvegarde & PRA : « Restaurer, pas espérer. » — Veeam Backup & Replication · Règle 3-2-1-1-0 · Tests de restauration planifiés · Réplication hors site · Plan de reprise écrit → `?domaine=backup`
   - Réseau & sécurité : « Fermé par défaut. » — Tailscale et subnet routers · Reverse proxy et TLS · VLAN et règles de pare-feu · Durcissement Windows et Linux · Moindre privilège sur l'AD → `?domaine=reseau`
   - Automatisation & IA : « Scripter le répétitif. » — PowerShell et Bash · Docker et k3s · Passthrough GPU, Ollama · Agents IA auto-hébergés · Home Assistant → `?domaine=auto`
7. **Sous le capot** (`#homelab`) : fond encre, grille 80 px à 7 %, coordonnées « A1 », « C1 ». « 04 — Sous le capot », H2 « Trois sites. / Un seul réseau. ». Schéma 1240×600 dans un conteneur `overflow-x:auto` (défilement horizontal sur mobile) : Site 01 Domicile (pve-01 · Proxmox VE, ZFS ~9 To, GPU, 6 VMs en chips), Site 02 Distant (nas-02 · réplica), Site 03 VPS (edge-01 · reverse proxy, actif/secours). Liens en pointillés `#55B3FB` (Tailnet · WireGuard, Réplication ZFS), chemin de secours `#FEC63A` (Bascule auto), légende. **Amélioration prévue** : paquets pixel 4×4 animés le long des liens (désactivés en reduced-motion).
8. **Parcours** (`#parcours`) : gauche « 05 — Parcours & certifications » + H2 « Du BTS. / À la prod. » ; droite liste à filets : date mono 150 px, titre 22 px, description muted, tag bordé. Entrées : 2024 → auj. Admin sys ESN · 2025–2026 Licence cybersécurité · 2023–2024 Titre RNCP AIS (niveau 6) · 2021–2023 BTS SIO SISR. **Dates à confirmer par moi.**
9. **CTA final** (`#contact`) pleine largeur : dégradé 30deg, damier de carrés `repeat(auto-fill,minmax(120px,1fr))` ratio 1 avec filets blancs 22 %, micro-labels encre SYN / SYN-ACK / ACK / EST. dans certaines cases, grand arc, grain, vertical « 06 — Contact ». Titre blanc `clamp(56px,8.4vw,136px)` « Construisons / votre infra. » en bas à gauche, boutons « Me contacter → » (encre) + « Télécharger le CV » (blanc), email en mono. **Vague** : chaque case a un calque teinté (`#C4001D` 1 case sur 3, sinon `#FFAF01`) animé opacité 0 → .5 → 0 sur 8 s, déphasé selon (x + y) → vague diagonale.
10. **Footer** : emblème 40 + wordmark 20 + phrase ; colonnes Site / Réseaux (LinkedIn, GitHub, Email) / Documents (CV, Étude de cas) ; bas : mascotte px 4 + « pid 1 · veille sur le homelab », © 2026. Dégradé discret en bas : `linear-gradient(180deg, transparent, rgba(255,130,4,.14) 60%, rgba(250,80,15,.3))` 160 px + grain.

### 2. Terminal interactif (`reference/Terminal.dc.html`) — pièce maîtresse
- Fond `#151524`, radius 8, bordure crème 12 %. Barre de titre mono 11 px : 3 carrés 8 px (`#FA500F`, `#FFAF01`, crème 25 %) + « tty1 · ssh visiteur@homelab », à droite statut (« démo auto » / « en ligne ») avec carré vert. Pied : « Tab — compléter · ↑ ↓ — historique · help — commandes ».
- Sortie Geist Mono 13 px / 1.7, `white-space:pre-wrap`, défilement auto en bas. Prompt `visiteur@homelab` en `#FF8204` + `:~$ ` en `#A9A89F`. Curseur bloc crème clignotant (1.05 s, steps).
- Couleurs de sortie : crème `#F2F1E8`, muted `#A9A89F`, bleu `#55B3FB` (dossiers), ambre `#FEC63A` (clés), vert `#44BA82` (succès), orange `#FA500F` (erreurs).
- Commandes : `help`, `whoami`, `ls projets`, `cat stack`, `ping contact` (3 réponses à 420 ms d'intervalle puis coordonnées), `history`, `clear` (+ Ctrl+L), `sudo …` (message « Accès root non accordé »), inconnue → « zsh: commande introuvable : x ». Textes exacts dans le fichier de référence.
- Tab : complète si une seule correspondance, sinon préfixe commun + liste. ↑/↓ : historique.
- Au chargement : ligne « Connexion établie — clé ed25519 vérifiée. », puis démo auto qui tape `whoami` puis `ls projets` (55–115 ms par caractère), puis « → À vous. Tapez help ou appuyez sur Tab. ». Clic ou touche pendant la démo = la démo s'arrête et le visiteur prend la main.
- Implémentation : `<input>` invisible (font-size 16 px pour iOS) qui capte le clavier, focus au clic sur le terminal. Sortie `aria-live="polite"`.

### 3. Projets par domaine (`reference/Projets.dc.html`) — `/projets?domaine=`
- Domaines : `tous`, `infra`, `backup`, `reseau`, `auto`. L'en-tête change selon le domaine : fil d'Ariane, label d'index, H1 sur 2 lignes (Tous : « Des projets réels. / En production. » ; Infra : « Des hôtes / qui tiennent. » ; Backup : « Restaurer, / pas espérer. » ; Réseau : « Fermé / par défaut. » ; Auto : « Scripter / le répétitif. »), phrase, 5 chips de compétences, panneau illustration ratio 4/3 (pixel art px 13, compteur « 0x projets »).
- Barre d'onglets sticky (sous la nav) : chips mono avec carré couleur + compteur ; actif = fond encre. Changement d'onglet → met à jour l'URL (`history.replaceState`) et remonte en haut.
- Grille `repeat(auto-fill, minmax(min(100%,380px),1fr))` gap 20, cartes projet (comme l'accueil + chips de stack). Pied : « Étude de cas → » si une page existe, sinon « Étude de cas — bientôt ».
- Domaine Sauvegarde : carte en pointillés « En rédaction — PRA type : Veeam B&R, copie immuable et test de restauration mensuel ».
- Bas : « Autres domaines », 3 tuiles à filets (pixel art 48 px + libellé + →).
- Correspondance projets ↔ domaines :
  - Migration Unraid → Proxmox VE / ZFS : infra, backup (seule étude de cas complète pour l'instant)
  - Réseau multi-sites Tailscale + reverse proxy : reseau
  - IA locale (GPU passthrough, Ollama, agents) : auto, infra
  - GLPI 11 sur Ubuntu : infra
  - Firmware HPE ProLiant : infra, reseau
  - DataWipe (opt-out data brokers, open source) : reseau, auto

### 4. Étude de cas (`reference/Projet.dc.html`) — `/projets/[slug]`
Modèle générique alimenté par le Markdown du projet. Exemple fourni : migration Unraid → Proxmox.
- Fil d'Ariane « ← Projets / 01 » + catégorie. Hero : H1 « 9 To déplacés. / Sans bouger. » + sous-titre ; panneau encre ratio 4/3 avec grille, blocs verts de la rampe, grain, arc, pixel art px 14.
- Grille méta 4 cases : Rôle / Période / Contexte / Statut.
- Corps 2 colonnes : sommaire sticky (Contexte, Problème, Solution, Résultats, Schéma, Stack, numérotés 01–06) + contenu `max-width:880px`. Problème : grille de 4 contraintes. Solution : liste numérotée de 4 étapes + bloc de code façon terminal. Résultats : 3 chiffres (le premier en orange). Schéma : bloc encre source → tunnel → cible. Stack : chips.
- Bandeau « Projet suivant » en dégradé sunset + grain + pixel art blanc + bouton carré →.

### 5. Veille (`reference/Veille.dc.html` + `reference/veille-data.js`) — `/veille`
- Hero : « Veille informatique — journal », H1 « Veille. / Tenue à jour. », phrase ; panneau sunset en damier 4×3 à filets blancs avec cases « Mise à jour · date », « Entrées · n », « Rythme · hebdo », « n sources », loupe pixel blanche au centre, grain, arc.
- Filtres sticky par sujet (masquer les sujets vides), `?sujet=` dans l'URL.
- Fil : article = date mono + « N° 00x » (numérotation décroissante), sujet (carré couleur), titre, encadré paper « À retenir » + avis, lien source ↗.
- Colonne sticky : « Radar perso » (carte encre, arcs, 3 anneaux Adopté `#44BA82` / À l'essai `#FEC63A` / À surveiller `var(--note)`) + « Sources suivies ».
- **Contenu** : une entrée = un fichier `src/content/veille/AAAA-MM-JJ-slug.md` (frontmatter : `date`, `sujet`, `titre`, `source`, `url` ; corps = « À retenir »). Radar, sujets et sources dans `src/data/veille.ts`. Les entrées de la référence sont des **exemples** à remplacer par mes vraies lectures.

### 6. Planche de composants (`reference/Composants.dc.html`) — `/composants`
Couleurs, typographie, emblème (construction, sunset, encre, blanc, blanc sur aplat, lockups clair/sombre, tailles 80/40/24/16), 4 icônes de domaines 160 px + versions encre 40 px / couleur 24 px, 6 illustrations projets, mascotte (animée + 3 frames), boutons + états, micro-labels et grille, cartes (repos / survol), terminal live. Page interne `noindex`.

---

## Animations (toutes désactivées si `prefers-reduced-motion: reduce`)
- **Titres** (`[data-rt]` → lignes `[data-rl]`) : à l'entrée dans le viewport (IntersectionObserver, seuil .15), translateY(105 %) + opacité 0 → 0, 600 ms `cubic-bezier(.16,1,.3,1)`, décalage 80 ms par ligne. Une seule fois.
- **Marquee** : 60 s linéaire, pause au survol.
- **Cartes** : lift −6 px + ombre + illustration en couleur, 500 ms expo-out.
- **Terminal** : effet machine à écrire sur la démo, puis la main au visiteur.
- **Damier CTA** : vague diagonale 8 s.
- **Mascotte** : 4 i/s.
- **Pages** : fondu enchaîné via View Transitions.
- Liens fléchés : `gap` 10 → 14 px au survol.

## Responsive
Tout est fluide (flex-wrap, `clamp()`, grilles `auto-fit/auto-fill`). Point de bascule de la nav : 900 px. Le schéma homelab défile horizontalement sous 1280 px. Cibles tactiles ≥ 44 px.

## Assets
- Polices Geist / Geist Mono (OFL) → `@fontsource/geist-sans`, `@fontsource/geist-mono`.
- Tout le pixel art est original et généré par code (`pixel.js`). Aucun asset tiers.
- À fournir par moi : logos technos monochromes, CV PDF, liens LinkedIn/GitHub, email, nom réel (placeholder « Prénom Nom », `contact@prenom-nom.fr`).

## Fichiers de référence
`reference/Accueil.dc.html` (ajouter `?theme=dark` pour la variante sombre), `Projets.dc.html`, `Projet.dc.html`, `Veille.dc.html`, `Composants.dc.html`, `Terminal.dc.html`, `pixel.js`, `veille-data.js`, `support.js` (runtime des maquettes uniquement, ne pas porter).
