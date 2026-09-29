import type { ArtName, Ramp } from '../lib/pixel';
import type { DomainKey } from './domaines';

export const NEWS = [
  { type: 'Projet', date: '09.2026', texte: "Homelab migré d'Unraid vers Proxmox VE / ZFS", href: '/projets/migration-unraid-proxmox' },
  { type: 'Diplôme', date: '2026', texte: 'Licence cybersécurité obtenue', href: '/#parcours' },
  { type: 'Open source', date: '08.2026', texte: 'DataWipe : première version publique', href: '/#projets' },
  { type: 'Homelab', date: '07.2026', texte: '3e subnet router Tailscale en ligne', href: '/#homelab' },
];

export const HERO_FACTS = [
  { label: 'Poste', value: 'Admin sys · ESN' },
  { label: 'Socle', value: 'Windows · Hyper-V · AD' },
  { label: 'À côté', value: 'Linux · Docker · k3s' },
];

// À faire : remplacer par des logos SVG monochromes --ink (placeholder texte en attendant).
export const STACK = ['Windows Server', 'Hyper-V', 'Active Directory', 'Veeam', 'Proxmox', 'Docker', 'k3s', 'Tailscale', 'Linux', 'GLPI', 'Home Assistant'];

export interface Metier {
  domaine: DomainKey;
  fig: string;
  legende: string;
  vertical: string;
  art: ArtName;
  ramp: Ramp;
  dot: string;
  label: string;
  titre: string;
  texte: string;
  puces: string[];
  lien: string;
  /** Position de l'arc en filigrane */
  arc: string;
  legendePos: 'left' | 'right';
}

export const METIERS: Metier[] = [
  {
    domaine: 'infra', fig: 'Fig. 03.1', legende: 'Hyper-V / Proxmox VE', vertical: 'Infra — 01', art: 'infra', ramp: 'blue', dot: '#0082E6',
    label: '01 / Infrastructure & virtualisation', titre: 'Des hôtes qui tiennent.',
    texte: "Je déploie et maintiens des hôtes Hyper-V et Proxmox, du firmware du serveur jusqu'à la dernière VM.",
    puces: ['Windows Server 2019 à 2025', 'Hyper-V et Proxmox VE', 'Active Directory, GPO, DNS / DHCP', 'Stockage ZFS', 'Cycle de vie HPE ProLiant'],
    lien: 'Voir les projets infra', arc: 'left:-85%;top:-25%', legendePos: 'right',
  },
  {
    domaine: 'backup', fig: 'Fig. 03.2', legende: 'Veeam B&R · 3-2-1-1-0', vertical: 'PRA — 02', art: 'backup', ramp: 'green', dot: '#318E68',
    label: '02 / Sauvegarde & PRA', titre: 'Restaurer, pas espérer.',
    texte: 'Une sauvegarde ne compte que si elle a été restaurée. Je teste, je chronomètre, je documente.',
    puces: ['Veeam Backup & Replication', 'Règle 3-2-1-1-0', 'Tests de restauration planifiés', 'Réplication hors site', 'Plan de reprise écrit'],
    lien: 'Voir les projets sauvegarde', arc: 'right:-85%;bottom:-40%', legendePos: 'left',
  },
  {
    domaine: 'reseau', fig: 'Fig. 03.3', legende: 'Zero-trust · TLS', vertical: 'Sécu — 03', art: 'lock', ramp: 'sunset', dot: '#FA500F',
    label: '03 / Réseau & sécurité', titre: 'Fermé par défaut.',
    texte: "Segmenter, n'ouvrir que le nécessaire, tracer le reste. Appliqué au quotidien, pas seulement en audit.",
    puces: ['Tailscale et subnet routers', 'Reverse proxy et TLS', 'VLAN et règles de pare-feu', 'Durcissement Windows et Linux', "Moindre privilège sur l'AD"],
    lien: 'Voir les projets réseau & sécu', arc: 'left:-85%;bottom:-40%', legendePos: 'right',
  },
  {
    domaine: 'auto', fig: 'Fig. 03.4', legende: 'Ollama · k3s · PowerShell', vertical: 'Auto — 04', art: 'chip', ramp: 'pop', dot: 'var(--note)',
    label: '04 / Automatisation & IA', titre: 'Scripter le répétitif.',
    texte: "Ce qui se fait deux fois se scripte. Ce qui se scripte se versionne. Et l'IA tourne en local.",
    puces: ['PowerShell et Bash', 'Docker et k3s', 'Passthrough GPU, Ollama', 'Agents IA auto-hébergés', 'Home Assistant'],
    lien: 'Voir les projets auto & IA', arc: 'right:-85%;top:-25%', legendePos: 'left',
  },
];

export const PARCOURS = [
  { dates: '2026 → auj.', titre: 'Administrateur réseaux & systèmes — CMI SERVICES', texte: 'Parcs Windows Server et Hyper-V à Vitrolles.', tag: 'Poste' },
  { dates: '2024 — 2025', titre: 'Licence cybersécurité', texte: 'MyDigitalSchool. Mémoire sur le protocole AS2 dans les échanges EDI.', tag: 'Diplôme' },
  { dates: '2022 — 2025', titre: 'Transport SALESKY', texte: 'De technicien N1/N2 à administrateur des infrastructures sécurisées.', tag: 'Poste' },
  { dates: '2022 — 2024', titre: 'BTS SIO', texte: 'Services informatiques aux organisations.', tag: 'Diplôme' },
];
