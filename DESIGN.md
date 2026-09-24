---
name: Portfolio Mathis — Design System v2 "Field"
version: 2.0.0
description: >
  Refonte du portfolio. Structure, grille et composants interactifs inspirés de mistral.ai
  (cadre à filets visibles, champ de pixels réactif, mosaïque de services, rail d'onglets
  collant, prompt de commande). Palette inspirée de zentro.framer.media : bleu cobalt
  saturé en grands aplats, orange signal, noir franc, typo blanche massive.
  Remplace le design system v1 "cyberpunk industriel".

colors:
  # Papier (fond de page, repris de Mistral)
  paper:        "#F7F7F4"
  paper-2:      "#EFEEE8"   # panneaux secondaires, hover de cellule
  paper-3:      "#E6E4DC"   # cellules vides de la mosaïque
  line:         "#E1E0D8"   # filets de grille
  # Encre
  ink:          "#14161C"   # texte principal, bouton nav
  ink-2:        "#5B5F6B"   # texte secondaire
  ink-3:        "#9A9DA6"   # placeholders, désactivé
  # Champ bleu (Zentro)
  field-700:    "#1B3A94"
  field-600:    "#2451C2"
  field-500:    "#2E6BE0"   # couleur de marque
  field-400:    "#4F86EA"
  field-300:    "#8FB4F5"
  # Signal orange (Zentro)
  signal-600:   "#D9501F"
  signal-500:   "#EE6A3C"   # CTA, alertes, pixel "port actif"
  signal-300:   "#FFB38F"
  # Nuit (bande sombre, terminal)
  night:        "#0D1330"
  night-2:      "#161D42"
  night-line:   "rgba(255,255,255,0.10)"
  # Statut
  up:           "#2FD17A"   # service en ligne, uniquement pour les états
  # Catégories projets
  cat-network:  "#2E6BE0"
  cat-security: "#EE6A3C"
  cat-systems:  "#14161C"
  cat-backup:   "#8FB4F5"

typography:
  display-xl:  { fontFamily: "Archivo", fontStretch: "125%", fontWeight: 800, fontSize: "clamp(96px, 17vw, 260px)", lineHeight: "0.82", letterSpacing: "-0.04em" }
  display:     { fontFamily: "Archivo", fontWeight: 500, fontSize: "clamp(48px, 6.5vw, 96px)", lineHeight: "1.0", letterSpacing: "-0.02em" }
  h1:          { fontFamily: "Archivo", fontWeight: 500, fontSize: "56px", lineHeight: "1.05", letterSpacing: "-0.02em" }
  h2:          { fontFamily: "Archivo", fontWeight: 500, fontSize: "44px", lineHeight: "1.1", letterSpacing: "-0.015em" }
  h3:          { fontFamily: "Archivo", fontWeight: 500, fontSize: "32px", lineHeight: "1.25", letterSpacing: "-0.01em" }
  h4:          { fontFamily: "Archivo", fontWeight: 600, fontSize: "24px", lineHeight: "1.3" }
  lead:        { fontFamily: "Archivo", fontWeight: 400, fontSize: "32px", lineHeight: "1.25", letterSpacing: "-0.01em" }
  body:        { fontFamily: "Archivo", fontWeight: 400, fontSize: "16px", lineHeight: "1.5" }
  small:       { fontFamily: "Archivo", fontWeight: 400, fontSize: "14px", lineHeight: "1.45" }
  mono-label:  { fontFamily: "JetBrains Mono", fontWeight: 500, fontSize: "11px", letterSpacing: "0.04em", textTransform: "uppercase" }
  mono:        { fontFamily: "JetBrains Mono", fontWeight: 400, fontSize: "14px", lineHeight: "1.6" }

spacing: { 1: "4px", 2: "8px", 3: "12px", 4: "16px", 5: "24px", 6: "32px", 7: "48px", 8: "64px", 9: "96px", 10: "128px" }

grid:
  container: "1408px"      # cadre central à filets verticaux
  gutter-outer: "40px"
  columns: 12
  pixel-cell: "82px"       # taille d'une tuile du champ de pixels

rounded: { none: "0px", sm: "4px", md: "6px", lg: "10px", full: "999px" }

motion:
  ease-standard: "cubic-bezier(0.4, 0, 0.2, 1)"
  ease-emphasis: "cubic-bezier(0.65, 0, 0.15, 0.99)"
  fast: "150ms"
  base: "300ms"
  slow: "500ms"
  pixel-tick: "900ms"
---

# Portfolio Mathis — Design System v2 « Field »

## Ce qui a été observé

### mistral.ai (navigué, scrollé, survolé)

Relevés extraits du DOM et de l'usage réel de la page :

| Élément | Valeur relevée |
|---|---|
| Fond de page | `#FBFBF8` (papier), panneaux `#F5F4EF`, `#EBE9E0` |
| Texte | zinc 900 (≈ `#18181B`), secondaire zinc 500 (≈ `#71717A`), filets zinc 200 |
| Palette de marque | dégradé de 5 oranges/rouges : `#FFAF01` `#FF8204` `#FF5229` `#E51300` + rouge sombre |
| Bleus secondaires | `#0082E6`, `#55B3FB`, `#B9DAFF` (section Studio) |
| Bande sombre | `#151524` |
| Display | police propriétaire ALTMistral, 96px, graisse 500, tracking −1.92px (−0.02em), interligne 1.0 |
| Corps | Inter 16px / 24px |
| Labels | Space Mono 11px, majuscules |
| Boutons | radius 6px, padding 8×12px, 16px ; primaire noir plein, secondaire `rgba(7,7,11,.05)` |
| Easing | `cubic-bezier(0.4,0,0.2,1)` dominant, durées 150ms / 300ms / 500ms |
| Hero | un `<canvas>` 2D de 1208×342px |

Les mécaniques qui font l'identité du site :

1. **Le cadre** : tout le contenu vit dans un conteneur délimité par deux filets verticaux qui descendent sur toute la page. Les sections sont des cellules bordées, jamais des cartes flottantes avec ombre.
2. **Le champ de pixels** : un canvas en tuiles carrées de plusieurs teintes de la couleur de marque, qui se recomposent en continu et réagissent au curseur. Des losanges (tuiles à 45°) ponctuent la grille. Des repères d'imprimerie (petits carrés noirs) marquent certaines intersections, avec des labels mono (« FRONTIER AI », « IN YOUR HANDS »). Un petit sprite pixel (le chat) habite le champ.
3. **Le titre qui s'écrit** : le H1 apparaît lettre par lettre avec un doublement de glyphes (« FFrontiier ») avant de se stabiliser, avec un curseur bloc.
4. **La mosaïque de produits** : des tuiles de tailles différentes emboîtées comme un puzzle, des cellules vides grisées pour aérer, et au survol une barre verticale de couleur qui apparaît sur le bord droit de la tuile.
5. **Le rail d'onglets collant** : dans la longue section produits, une colonne d'icônes fixe à gauche indique quel bloc est à l'écran.
6. **Le prompt** : un vrai champ de saisie posé sur un aplat de couleur quadrillé, avec trois suggestions cliquables. Des « câbles » (lignes fines à angle droit) le relient à des nœuds-icônes dans la grille.
7. **La bande de nuit** : une section sombre pleine largeur, centrée, en trois cellules.
8. **Le pied de page** : colonnes de liens bordées, grand logo pixel, puis bandes horizontales empilées aux couleurs de la marque, le chat y marche.

### zentro.framer.media (capture fournie)

Grand aplat bleu cobalt saturé (≈ `#2E6BDE` en haut vers `#2449B0` en bas), silhouette noire en contre-jour, un seul accent orange (≈ `#EE6A3C`) sur les lunettes et le CTA, nom de marque en grotesque blanche géante qui déborde la largeur, titres en capitales grasses avec un mot en italique, CTA orange à coins légèrement arrondis.

## Le parti pris

**On garde la mécanique de Mistral, on remplace sa chaleur par le bleu de Zentro, et on donne un sens métier à chaque motif.** Le champ de pixels n'est plus une abstraction : c'est une matrice de ports de switch. Le prompt n'est plus un chatbot : c'est un shell qui répond vraiment. La mosaïque, c'est l'infrastructure que tu administres.

Trois règles :

1. **Une seule chose spectaculaire par écran.** Le champ bleu est le moment fort. Tout le reste est papier, encre et filets.
2. **L'orange est une alerte, pas une décoration.** Un CTA par vue, un pixel « port actif » sur une dizaine, l'indicateur de l'onglet courant. Rien d'autre.
3. **La grille est visible.** Filets de 1px partout où Mistral en met. Pas d'ombres portées, pas de glassmorphism, pas de glow.

## Couleurs

Le fond de page est un papier clair. Le bleu `field-500` n'apparaît qu'en **grands aplats** (hero, visuels de projets, bande de pied de page), jamais en petite touche dans le texte. Dans un aplat bleu, on utilise l'échelle `field-700 → field-300` pour les tuiles, et `signal-500` pour au plus une tuile sur douze.

| Usage | Token |
|---|---|
| Fond de page | `paper` |
| Panneau de droite du hero, hover de cellule | `paper-2` |
| Cellules vides de mosaïque | `paper-3` |
| Filets | `line` (sur papier), `night-line` (sur nuit) |
| Texte | `ink`, secondaire `ink-2` |
| Bouton de nav « Me contacter » | fond `ink`, texte `paper` |
| CTA principal du hero | fond `signal-500`, texte blanc |
| Terminal, bande sombre | `night` |
| Service en ligne | `up`, seulement dans les indicateurs d'état |

Contrastes vérifiés : `ink` sur `paper` 16.9:1, `ink-2` sur `paper` 6.2:1, blanc sur `field-500` 4.6:1 (OK pour le display et les boutons, éviter le corps de texte long), blanc sur `signal-500` 3.2:1 (réservé au texte ≥ 18px ou gras ≥ 14px, sinon utiliser `signal-600`).

## Typographie

Deux familles, rôles nets.

**Archivo** (Google Fonts, axe de largeur 62–125%) couvre tout le texte. En largeur normale et graisse 500 avec un tracking serré, elle joue le rôle d'ALTMistral pour les titres. En largeur 125% et graisse 800, elle donne le nom géant façon « ZENTRO ».

**JetBrains Mono** pour les labels de grille, les tags techniques, le terminal et les adresses IP. Elle est plus lisible que Space Mono à petite taille et plus crédible pour un sysadmin.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Titres en casse de phrase avec point final, comme Mistral : « Infrastructure maîtrisée. » Les capitales sont réservées au nom géant et aux `mono-label`.

## Layout

### Le cadre

```
|<-40->|<----------------- 1408px ----------------->|<-40->|
       │  filet vertical gauche      filet droit    │
       ├────────────────────────────────────────────┤  ← filet horizontal entre sections
       │                                            │
```

Le conteneur central porte `border-left` et `border-right` en `line` sur toute la hauteur de la page. Chaque section est séparée par un filet horizontal qui touche les deux bords. Les blocs internes sont des cellules bordées qui partagent leurs filets (pas de double trait : `margin: -1px` ou `gap: 1px` sur fond `line`).

### Hero (desktop)

```
┌──────────────────────────────── NAV 56px ─────────────────────────────────┐
│ ▣ Accueil  Projets  Parcours  Veille  Contact     CV ▾ │ [Me contacter >] │
├───────────────────────────────────────────┬───────────────────────────────┤
│                                           │ paper-2                       │
│                                           │                               │
│  Infrastructure                           │ J'administre des parcs        │
│  maîtrisée.▌                              │ Windows Server, Hyper-V et    │
│                                           │ Veeam pour des clients en ESN.│
├───────────────────────────────────────────┼───────────────────────────────┤
│ ■ CHAMP DE PIXELS (canvas, fond bleu) ■   │ ↓ ↓ ↓                         │
│ ▪ SW-CORE-01              UPLINK OK ▪     │                               │
│        ◆          ▫ sprite                │ DERNIÈRE MISE À JOUR          │
│                                           │ [img] Titre RNCP AIS   [>][<] │
└───────────────────────────────────────────┴───────────────────────────────┘
│  MATHIS  (display-xl, blanc sur field, déborde)                            │
```

Proportions : colonne gauche 70%, droite 30%. En dessous de 900px, tout passe en une colonne et le panneau de droite suit le titre.

## Composants

### 1. Navigation

Barre de 56px sur `paper`, filet bas `line`. Chaque lien est une cellule séparée par un filet vertical (comme Mistral). Logo : un petit monogramme pixel 16×16 en `field-500` avec un pixel `signal-500`. À droite : bouton secondaire « CV » avec chevron (ouvre un menu : PDF, LinkedIn, GitHub), puis bouton plein `ink` « Me contacter » qui colle au bord droit du cadre, sans marge.

Au scroll, la barre reste fixe et opaque. Pas de flou.

### 2. Titre qui s'écrit

Le H1 du hero s'affiche caractère par caractère (35ms par caractère) avec un curseur bloc `ink` qui clignote. Pendant la frappe, chaque nouveau caractère apparaît d'abord doublé une frame (effet de rebond de touche observé chez Mistral), puis se stabilise. Un tiret bas de 48px sous le curseur marque la ligne de saisie pendant la frappe puis disparaît.

```js
async function typeTitle(el, text, speed = 35) {
  el.textContent = '';
  for (const ch of text) {
    el.textContent += ch + ch;           // glyphe doublé une frame
    await new Promise(r => requestAnimationFrame(r));
    el.textContent = el.textContent.slice(0, -1);
    await new Promise(r => setTimeout(r, speed));
  }
}
```

Avec `prefers-reduced-motion`, le titre s'affiche d'un coup.

### 3. Champ de pixels « matrice de ports » (composant signature)

Canvas 2D pleine largeur de la colonne gauche, hauteur 340px, fond `field-500`.

- Grille de cellules de 82px. Chaque cellule est un « port ». Sa couleur est tirée au hasard dans `field-700`, `field-600`, `field-500`, `field-400`, `field-300`, avec une probabilité de 1/12 d'être `signal-500` (port en alerte ou en activité).
- Toutes les 900ms (`pixel-tick`), 10 à 15% des cellules changent de teinte avec un fondu de 300ms.
- Des blocs de 2×1 ou 2×2 cellules de même teinte apparaissent pour casser la régularité, comme chez Mistral.
- Deux ou trois losanges (carré tourné à 45°) de la taille d'une cellule, en `field-700` ou `signal-500`.
- **Interaction** : au survol, la cellule sous le curseur passe en `field-300` et ses 4 voisines en `field-400`, avec une traîne qui s'éteint sur 500ms. Au clic, la cellule passe en `signal-500` et affiche en mono un faux libellé de port (`Gi1/0/14 — UP`).
- Repères : trois lignes de grille plus foncées (`field-700`, 1px) et des carrés `ink` de 5px à leurs intersections. Labels `mono-label` en `ink` accrochés aux repères : `SW-CORE-01` et `UPLINK OK`.
- Sprite : un petit personnage pixel original (proposition : un mini-serveur 12×14px avec deux LEDs et des pieds) qui se déplace d'une cellule toutes les 2 secondes le long de la ligne du bas.

Performance : `requestAnimationFrame` en pause quand le canvas sort de l'écran (`IntersectionObserver`), redessin limité aux cellules modifiées, `devicePixelRatio` pris en compte. Mouvement réduit : grille figée, survol conservé.

### 4. Nom géant

Sous le hero, une bande `field-500` pleine largeur (elle sort du cadre) avec le nom en `display-xl` blanc, qui déborde légèrement à droite comme « ZENTRO ». Option : une photo de profil détourée, traitée en silhouette sombre, posée derrière les lettres (le motif Zentro), avec un seul détail orange.

### 5. Carte « dernière mise à jour »

Dans le panneau de droite du hero : vignette carrée 56px, titre sur deux lignes, et deux boutons carrés empilés `>` et `<` bordés en `line` pour faire défiler 3 à 5 actualités (certification, projet livré, article de veille). Transition : fondu croisé 300ms, pas de glissement.

### 6. Bandeau stack technique

Rangée de cellules de hauteur 120px séparées par des filets, un logo ou pictogramme monochrome `ink` par cellule : Windows Server, Hyper-V, Active Directory, Veeam, Linux, Docker, Kubernetes, pfSense. Au survol, la cellule passe en `paper-2` et le nom apparaît en `mono-label` sous le logo. Sur mobile, défilement horizontal avec accroche par cellule.

### 7. Mosaïque « Ce que j'administre »

Titre centré en `h2` : « Tout ce que je fais tourner. » puis une composition de tuiles emboîtées sur une grille de 6 colonnes :

```
            ┌───────────┐
            │ Serveurs  │
      ┌─────┼─────┬─────┤     ┌─────┐
      │ ░░░ │ AD  │Veeam│     │Réseau│
┌─────┼─────┴─────┴─────┤     │     │
│Linux│   Homelab       │ ░░░ │     │
└─────┴─────────────────┘     └─────┘
```

- Tuile : fond `paper`, filet `line`, pictogramme 24px en haut à gauche (carré de couleur de catégorie avec une icône blanche), titre `h4` en bas, une ligne de description `small` en `ink-2`.
- Cellules vides en `paper-3` pour la respiration, et un ou deux losanges `paper-3` qui dépassent de la composition.
- Repères d'intersection : carrés `ink` de 4px sur certains angles.
- **Survol** : une barre verticale de 24px de large glisse depuis le bord droit de la tuile, couleur de la catégorie (300ms, `ease-emphasis`). Le titre se décale de 4px vers la gauche. Au clic, défilement vers le bloc correspondant de la section suivante.

### 8. Vitrine de projets avec rail collant

Section longue. À gauche, un rail fixe de 6 icônes carrées de 24px (une par projet). L'icône du projet visible est pleine `ink`, les autres en `ink-3`. Clic sur une icône = défilement vers le projet.

Chaque projet :

```
Titre du projet.                                [Voir le projet >]
Une phrase qui dit ce que ça fait, pour qui, avec quoi.
┌──────────────────────────────────────────────────────────────┐
│ aplat de couleur de catégorie, quadrillé 1px à 10% de blanc   │
│   ▢──┐          ┌───────────────────────┐                     │
│      └──────────┤  élément d'interface  ├─────▢               │
│                 └───────────────────────┘                     │
└──────────────────────────────────────────────────────────────┘
VLAN · OSPF · ACL · PFSENSE          (tags mono-label, bordés)
```

- L'aplat reprend le quadrillage Mistral avec quelques tuiles plus claires qui pulsent doucement.
- Les « câbles » sont des polylignes SVG blanches de 1px à angle droit, qui relient l'élément central à des nœuds-icônes (carrés de 40px à fond 15% de blanc). Au scroll, ils se dessinent (`stroke-dashoffset`, 500ms) quand le bloc entre dans l'écran. C'est la seule animation déclenchée par le scroll du site.
- Selon le projet, l'élément central est : une capture de Zabbix, un schéma d'architecture, un extrait de config, ou le prompt ci-dessous.
- Aplats par catégorie : réseau `field-500`, sécurité `signal-500`, systèmes `night`, sauvegarde `field-300` (texte `ink` dessus).

### 9. Prompt shell (composant interactif phare)

L'équivalent du « What would you like to do today? » de Mistral, en version terminal. Posé sur un aplat `field-500` quadrillé, c'est le premier bloc de la vitrine.

- Champ : fond blanc, radius `md`, hauteur 48px, préfixe `mathis@portfolio:~$` en `mono` `ink-2`, bouton d'envoi carré `ink` 32px avec flèche vers le haut.
- Sous le champ, carte blanche avec 3 suggestions (icône 16px + texte `small`) : `whoami`, `ls projets/`, `cat certifications.txt`.
- Clic sur une suggestion ou saisie + Entrée : la carte se transforme en sortie de terminal (fond `night`, texte `mono` blanc, prompt `signal-500`) qui affiche une réponse écrite à la main. Commandes prévues : `whoami`, `ls projets/`, `cat certifications.txt`, `uptime` (années d'expérience), `ping mathis` (renvoie les contacts), `help`. Commande inconnue : `commande introuvable : xyz — tape help pour la liste`.
- Historique avec ↑/↓, `Tab` pour compléter, `clear` pour vider.
- Accessibilité : le champ est un vrai `<input>` avec `<label>`, la sortie est dans une zone `aria-live="polite"`.

### 10. Bande de nuit « Comment je travaille »

Section `night` pleine largeur. Centré : `mono-label` blanc à 60%, trois pictogrammes pixel 32px, puis une phrase en `h2` blanc sur trois lignes max. En dessous, trois cellules séparées par `night-line` : titre `h4` blanc en haut, texte `small` blanc à 70% en bas, hauteur minimale 260px. Exemples : « Documenter. », « Sauvegarder. », « Superviser. »

### 11. Pied de page

- Quatre colonnes de liens bordées (Projets, Parcours, Ressources, Contact), titres en `small` `ink-2`, liens en `small` `ink`.
- Ligne sociale : LinkedIn, GitHub, e-mail en icônes 20px.
- À droite : sélecteur de thème à trois états (système / clair / sombre) en boutons icônes de 24px, comme Mistral.
- Au centre, le monogramme pixel en grand (96px de haut) posé sur les bandes.
- **Bandes** : quatre bandes horizontales pleine largeur de 48px, de haut en bas `field-300`, `field-400`, `field-500`, `field-700`. Le sprite du hero marche sur la deuxième bande. Une seule bande `signal-500` peut remplacer `field-400` si tu veux rappeler l'accent.

### 12. Boutons

| Variante | Style | Usage |
|---|---|---|
| Plein encre | fond `ink`, texte `paper`, radius `md`, padding 8×12px, 16px, graisse 500, chevron `>` 12px | Nav « Me contacter » |
| Signal | fond `signal-500`, texte blanc, radius `md`, padding 12×20px, 16px graisse 600 | Un seul CTA par vue (hero) |
| Doux | fond `rgba(20,22,28,0.05)`, texte `ink`, radius `md` | « Voir le projet », « CV » |
| Carré | 32×32px, filet `line`, icône 14px | Flèches de carrousel, rail |

États : survol assombrit de 8% (150ms), focus clavier = anneau 2px `field-500` avec 2px de décalage, désactivé = 40% d'opacité.

### 13. Tags

`mono-label` dans une boîte à filet `line` de 1px, radius `sm`, padding 4×8px, fond transparent. Sur un aplat de couleur, filet et texte blancs à 70%.

### 14. Indicateur d'état

Point de 8px `up` avec un anneau qui s'étend et s'efface toutes les 2s. Uniquement pour « Disponible » et les services en ligne du homelab.

## Mode sombre

Le sélecteur de thème inverse papier et nuit : fond `night`, cellules `night-2`, filets `night-line`, texte blanc et blanc à 65%. Les aplats bleus, les bandes et l'orange ne changent pas. Tous les tokens sont définis sur `:root` et redéfinis sous `[data-theme="dark"]` et `@media (prefers-color-scheme: dark)`.

## Mouvement

| Quoi | Durée | Courbe |
|---|---|---|
| Survol de bouton, de cellule | 150ms | `ease-standard` |
| Changement de teinte d'un pixel, fondu de carte | 300ms | `ease-standard` |
| Barre de catégorie de la mosaïque | 300ms | `ease-emphasis` |
| Tracé des câbles au scroll | 500ms | `ease-emphasis` |
| Cycle du champ de pixels | 900ms | — |
| Curseur du titre | 1s | `steps(1)` |

Pas de rebond, pas de ressort, pas d'apparition en fondu-glissé sur chaque section. Tout est coupé ou figé avec `prefers-reduced-motion: reduce`.

## À faire / à éviter

À faire : garder les filets visibles et partagés, réserver le bleu aux grands aplats, un seul CTA orange par vue, des titres courts avec point final, des contenus techniques réels dans le shell et les visuels (vraies commandes, vrais VLAN, vraies versions).

À éviter : ombres portées, glassmorphism, glow, cartes flottantes arrondies à 16px, orange en texte courant, bleu en petite touche, plus de deux couleurs de catégorie dans un même bloc, texte de corps blanc sur `signal-500`.

## Tokens CSS

```css
:root {
  --paper:#F7F7F4; --paper-2:#EFEEE8; --paper-3:#E6E4DC; --line:#E1E0D8;
  --ink:#14161C; --ink-2:#5B5F6B; --ink-3:#9A9DA6;
  --field-700:#1B3A94; --field-600:#2451C2; --field-500:#2E6BE0; --field-400:#4F86EA; --field-300:#8FB4F5;
  --signal-600:#D9501F; --signal-500:#EE6A3C; --signal-300:#FFB38F;
  --night:#0D1330; --night-2:#161D42; --night-line:rgba(255,255,255,.10);
  --up:#2FD17A;
  --font-sans:'Archivo', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono:'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace;
  --radius-sm:4px; --radius-md:6px; --radius-lg:10px;
  --ease:cubic-bezier(.4,0,.2,1); --ease-emph:cubic-bezier(.65,0,.15,.99);
  --container:1408px; --cell:82px;
}
[data-theme="dark"] {
  --paper:#0D1330; --paper-2:#161D42; --paper-3:#1D2552; --line:rgba(255,255,255,.10);
  --ink:#FFFFFF; --ink-2:rgba(255,255,255,.65); --ink-3:rgba(255,255,255,.40);
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --paper:#0D1330; --paper-2:#161D42; --paper-3:#1D2552; --line:rgba(255,255,255,.10);
    --ink:#FFFFFF; --ink-2:rgba(255,255,255,.65); --ink-3:rgba(255,255,255,.40);
  }
}
```

## Ordre de construction conseillé

1. Tokens, polices, cadre à filets, nav et pied de page statiques.
2. Hero : titre qui s'écrit, panneau droit, carte d'actualité.
3. Champ de pixels (le composant qui porte l'identité, à soigner en premier parmi les interactifs).
4. Bandeau stack et mosaïque avec survol.
5. Prompt shell.
6. Vitrine avec rail collant et câbles SVG.
7. Bande de nuit, mode sombre, passe accessibilité et mobile.
