// Contenu de la page /cv. Les coordonnées (adresse, téléphone) ne figurent que dans le PDF.

export type CvKind = 'poste' | 'formation';

export interface CvEntry {
  kind: CvKind;
  dates: string;
  /** Repère de tri (année de début) */
  start: number;
  titre: string;
  lieu: string;
  texte?: string;
  puces?: string[];
  tag: string;
  /** Poste en cours */
  current?: boolean;
}

export const CV_PAGE = {
  poste: 'Administrateur réseaux & systèmes',
  employeur: 'CMI SERVICES',
  ville: 'Vitrolles (13)',
  depuis: '2026',
  environnement: 'Windows Server · Hyper-V',
};

// Ordre antéchronologique.
export const CV_TIMELINE: CvEntry[] = [
  {
    kind: 'poste', dates: '2026 → auj.', start: 2026, current: true,
    titre: 'Administrateur réseaux & systèmes', lieu: 'CMI SERVICES — Vitrolles (13)',
    texte: 'Administration de parcs Windows Server et Hyper-V.',
    tag: 'En poste',
  },
  {
    kind: 'poste', dates: '2024 — 2025', start: 2024,
    titre: 'Administrateur des infrastructures sécurisées', lieu: 'Transport SALESKY — infrastructure multi-sites',
    puces: [
      'Déploiement OpenAS2 (AS2 / EDI) en conteneur Docker sur OVH Cloud',
      'Sécurisation : DMZ pfSense, reverse proxy HAProxy, certificats SSL / wildcard',
      'Supervision Zabbix : agents, dashboards, alertes proactives',
      'Sauvegardes Veeam et Proxmox Backup, plan de restauration',
      'Scripts Bash : sauvegardes Docker, mises à jour, cron',
    ],
    tag: 'Poste',
  },
  {
    kind: 'formation', dates: '2024 — 2025', start: 2024,
    titre: 'Licence cybersécurité', lieu: 'MyDigitalSchool',
    texte: 'Mémoire soutenu : « Mise en place du protocole AS2 dans le cadre des échanges EDI ».',
    tag: 'Diplôme',
  },
  {
    kind: 'poste', dates: '2023 — 2024', start: 2023,
    titre: 'Administrateur systèmes et réseaux', lieu: 'Transport SALESKY',
    puces: [
      'Hyperviseurs Proxmox : migration, haute dispo, datacenter',
      'VMware vSphere et Hyper-V',
      'Maintien en condition opérationnelle Ubuntu et Windows Server sur 6 filiales',
      "Pilotage de la migration complète de l'infrastructure hyperviseur",
      "Encadrement d'un technicien support",
    ],
    tag: 'Poste',
  },
  {
    kind: 'formation', dates: '2022 — 2024', start: 2022,
    titre: 'BTS SIO', lieu: 'École Supérieure des Pays de la Loire',
    texte: 'Services informatiques aux organisations.',
    tag: 'Diplôme',
  },
  {
    kind: 'poste', dates: '2022 — 2023', start: 2022,
    titre: 'Technicien informatique N1 / N2', lieu: 'Transport SALESKY',
    puces: [
      'Support N1 / N2 : ticketing, hotline, dépannage à distance et sur site',
      'Installation et déploiement de postes de travail',
      'Comptes utilisateurs Active Directory',
      'Documentation technique et procédures',
    ],
    tag: 'Poste',
  },
  {
    kind: 'formation', dates: '2019 — 2022', start: 2019,
    titre: 'Baccalauréat STI2D', lieu: 'Lycée Raphaël Élizé',
    texte: "Sciences et technologies de l'industrie et du développement durable.",
    tag: 'Diplôme',
  },
];

export const CV_SKILLS: { label: string; items: string[] }[] = [
  { label: 'Virtualisation', items: ['Proxmox (migration, HA)', 'VMware vSphere', 'Hyper-V'] },
  { label: 'Systèmes', items: ['Windows Server', 'Active Directory · DNS · DHCP · GPO', 'Linux Ubuntu (CLI)'] },
  { label: 'Réseau & sécurité', items: ['pfSense (DMZ, règles)', 'HAProxy', 'VPN IPsec', 'Certificats SSL / wildcard'] },
  { label: 'Sauvegarde & supervision', items: ['Veeam B&R', 'Proxmox Backup Server', 'Zabbix'] },
  { label: 'Conteneurs & automatisation', items: ['Docker, docker-compose', 'Scripts Bash', 'Cron'] },
  { label: 'Protocoles', items: ['HTTPS / TLS', 'IPsec', 'AS2 / EDI (OpenAS2)', 'FTP'] },
];

export const CV_INTERETS = ['Homelab', 'Automobile', 'Natation'];
