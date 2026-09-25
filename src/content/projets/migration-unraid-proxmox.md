---
titre: Migration homelab Unraid → Proxmox VE / ZFS
ordre: 1
domaines: [infra, backup]
categorie: Stockage · ZFS
art: migrate
ramp: green
legende: Unraid → Proxmox
impact: ~9 To transférés à distance, sans accès physique à la machine.
stack: [Proxmox VE, ZFS, rsync]
contexte: Étude de cas
accroche: [9 To déplacés., Sans bouger.]
etude:
  titre: [9 To déplacés., Sans bouger.]
  sousTitre: Migration de mon homelab d'Unraid vers Proxmox VE et ZFS, pilotée entièrement à distance à travers Tailscale.
  legende: Unraid → Proxmox VE / ZFS
  meta:
    role: Conception et exécution
    periode: 2026 · 3 semaines
    contexte: Homelab · site distant
    statut: En production
  contexte:
    titre: Une plateforme arrivée au bout.
  probleme:
    titre: Tout changer. À distance.
    texte: Remplacer la plateforme sans perdre une donnée, alors que la machine se trouvait sur un site où je ne pouvais pas me rendre.
    contraintes:
      - ~9 To de données, dont des sauvegardes
      - Aucun accès physique pendant l'opération
      - Interruption des services la plus courte possible
      - Intégrité vérifiable, fichier par fichier
  solution:
    titre: Quatre étapes. Réversibles.
    etapes:
      - titre: Inventaire et plan de bascule
        texte: Services, volumes, dépendances et ordre d'arrêt documentés avant la moindre commande.
      - titre: Proxmox VE et pool ZFS
        texte: Installation à distance, pool créé, un dataset par usage avec compression lz4.
      - titre: Transfert via Tailscale
        texte: rsync avec reprise sur erreur, puis vérification par sommes de contrôle.
      - titre: Bascule et décommission
        texte: Services redémarrés sur Proxmox, Unraid conservé en lecture seule jusqu'à validation.
    code:
      titre: root@pve-01 — extrait
      lang: bash
      lignes:
        - cmd: zpool create -o ashift=12 tank raidz1 /dev/disk/by-id/…
        - cmd: zfs create -o compression=lz4 tank/media
        - cmd: rsync -aHAX --partial --info=progress2 unraid:/mnt/user/ /tank/
        - cmd: zpool status tank
        - { cle: "state:  ", valeur: ONLINE }
        - { cle: "errors: ", valeur: No known data errors }
  resultats:
    titre: Migré. Vérifié. Répliqué.
    chiffres:
      - { valeur: ~9 To, label: transférés à distance }
      - { valeur: "0", label: erreur d'intégrité après vérification }
      - { valeur: 2 sites, label: snapshots répliqués par zfs send }
    texte: Le homelab dispose maintenant de snapshots planifiés, d'une copie hors site et d'une base propre pour k3s et les VMs GPU.
  schema:
    source: { nom: Unraid, detail: /mnt/user · XFS · parité }
    lien: { haut: Tailscale · WireGuard, bas: rsync → checksums }
    cible:
      nom: Proxmox VE · pool tank
      elements: [tank/media, tank/backups, tank/vm, tank/k3s]
      note: zfs send → site 02
      icone: backup
  stack:
    - { label: Proxmox VE, couleur: "#318E68" }
    - { label: ZFS, couleur: "#318E68" }
    - { label: Tailscale, couleur: "#0082E6" }
    - { label: rsync, couleur: "var(--fg)" }
    - { label: Debian, couleur: "var(--fg)" }
    - { label: Unraid (source), couleur: "#A9A89F" }
---

Le serveur principal du homelab tournait sous Unraid : stockage, conteneurs et quelques VMs. Il manquait des snapshots cohérents, une virtualisation de niveau production et une réplication propre vers un second site.
