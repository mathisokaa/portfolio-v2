// ─────────────────────────────────────────────────────────────
// VEILLE — fichier à mettre à jour.
// Ajouter une entrée EN TÊTE de `entries`, changer `updated`.
// tag : une des clés de `topics`.
// ─────────────────────────────────────────────────────────────
window.VEILLE = {
  updated: '22.09.2026',
  topics: {
    virtu: { label: 'Virtualisation', dot: '#0082E6' },
    secu: { label: 'Sécurité · CVE', dot: '#FA500F' },
    backup: { label: 'Sauvegarde', dot: '#318E68' },
    conteneurs: { label: 'Conteneurs', dot: '#55B3FB' },
    ia: { label: 'IA locale', dot: 'var(--note,#B9DAFF)' },
    windows: { label: 'Windows Server', dot: '#151524' },
    reglementaire: { label: 'Réglementaire', dot: '#FEC63A' }
  },
  entries: [
    { date: '18.09.2026', tag: 'virtu', title: 'Proxmox VE 9 : passage sur Debian 13 et ce que ça change pour un cluster homelab', source: 'Proxmox — notes de version', url: '#', take: "Mise à jour testée sur un nœud isolé avant le reste. Relire les notes sur les dépôts et le noyau avant de migrer." },
    { date: '11.09.2026', tag: 'secu', title: 'Vulnérabilités critiques Veeam Backup & Replication : suivre les correctifs', source: 'CERT-FR — avis', url: '#', take: "Le serveur de sauvegarde est une cible prioritaire : hors domaine, MFA, correctifs appliqués en priorité." },
    { date: '02.09.2026', tag: 'windows', title: 'Windows Server 2025 : hotpatching et redémarrages', source: 'Microsoft Tech Community', url: '#', take: "Intéressant pour réduire les fenêtres de maintenance. Vérifier les prérequis et le modèle de licence avant d'en parler au client." },
    { date: '26.08.2026', tag: 'ia', title: 'LLM locaux : quantification et VRAM, les bons ordres de grandeur', source: 'Documentation Ollama', url: '#', take: "Sur mon GPU, un modèle 7–8B quantifié reste le meilleur compromis vitesse / qualité pour des agents." },
    { date: '19.08.2026', tag: 'conteneurs', title: "k3s : mises à jour automatisées avec le system-upgrade-controller", source: 'Documentation k3s', url: '#', take: "À mettre en place sur le cluster du homelab, avec un plan de mise à jour par nœud." },
    { date: '05.08.2026', tag: 'reglementaire', title: 'NIS 2 : ce que la directive implique pour les prestataires infogérance', source: 'ANSSI', url: '#', take: "Les ESN deviennent maillon de la chaîne : attendre plus d'exigences de traçabilité et de gestion des accès." },
    { date: '22.07.2026', tag: 'backup', title: 'Règle 3-2-1-1-0 : pourquoi le « 1 » immuable devient la norme', source: 'Veeam — blog', url: '#', take: "Stockage immuable + test de restauration automatisé = la seule preuve qu'une sauvegarde est utilisable." },
    { date: '14.10.2025', tag: 'windows', title: 'Fin du support de Windows 10', source: 'Microsoft', url: '#', take: "Inventaire du parc client via GLPI pour chiffrer les migrations restantes." }
  ],
  radar: [
    { ring: 'Adopté', items: ['Proxmox VE', 'ZFS', 'Tailscale', 'Veeam B&R', 'PowerShell'] },
    { ring: "À l'essai", items: ['k3s', 'Ollama', 'Ansible', 'Agents IA'] },
    { ring: 'À surveiller', items: ['Hotpatch WS 2025', 'NIS 2', 'Passkeys / FIDO2', 'eBPF'] }
  ],
  sources: [
    { name: 'CERT-FR', type: 'Avis & alertes' },
    { name: 'ANSSI', type: 'Guides' },
    { name: 'Microsoft Tech Community', type: 'Blog éditeur' },
    { name: 'Forum Proxmox', type: 'Communauté' },
    { name: 'NoLimitSecu', type: 'Podcast' },
    { name: 'r/homelab', type: 'Communauté' }
  ]
};
