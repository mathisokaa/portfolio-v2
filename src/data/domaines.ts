import type { ArtName, Ramp } from '../lib/pixel';

export const DOMAIN_KEYS = ['infra', 'backup', 'reseau', 'auto'] as const;
export type DomainKey = (typeof DOMAIN_KEYS)[number];
export type FilterKey = 'tous' | DomainKey;

export interface Domain {
  label: string;
  short: string;
  index: string;
  l1: string;
  l2: string;
  text: string;
  skills: string[];
  art: ArtName;
  ramp: Ramp;
  dot: string;
  fig: string;
  vert: string;
  placeholder?: string;
}

export const DOMAINS: Record<FilterKey, Domain> = {
  tous: {
    label: 'Tous les projets', short: 'Tous', index: 'Projets — index',
    l1: 'Des projets réels.', l2: 'En production.',
    text: 'Production chez les clients de mon ESN, ou homelab sur trois sites : chaque projet a un contexte, une contrainte et un résultat vérifiable.',
    skills: ['Windows Server', 'Proxmox VE', 'Tailscale', 'Veeam', 'k3s'],
    art: 'emblem', ramp: 'sunset', dot: 'var(--fg)', fig: '00', vert: 'Index — 00',
  },
  infra: {
    label: 'Infrastructure & virtualisation', short: 'Infra', index: '01 / Infrastructure & virtualisation',
    l1: 'Des hôtes', l2: 'qui tiennent.',
    text: "Je déploie et maintiens des hôtes Hyper-V et Proxmox, du firmware du serveur jusqu'à la dernière VM.",
    skills: ['Windows Server 2019–2025', 'Hyper-V', 'Proxmox VE', 'Active Directory', 'HPE ProLiant'],
    art: 'infra', ramp: 'blue', dot: '#0082E6', fig: '01', vert: 'Infra — 01',
  },
  backup: {
    label: 'Sauvegarde & PRA', short: 'Sauvegarde', index: '02 / Sauvegarde & PRA',
    l1: 'Restaurer,', l2: 'pas espérer.',
    text: 'Une sauvegarde ne compte que si elle a été restaurée. Je teste, je chronomètre, je documente.',
    skills: ['Veeam B&R', '3-2-1-1-0', 'ZFS send / recv', 'Tests de restauration', 'PRA écrit'],
    art: 'backup', ramp: 'green', dot: '#318E68', fig: '02', vert: 'PRA — 02',
    placeholder: 'PRA type : Veeam B&R, copie immuable et test de restauration mensuel',
  },
  reseau: {
    label: 'Réseau & sécurité', short: 'Réseau & sécu', index: '03 / Réseau & sécurité',
    l1: 'Fermé', l2: 'par défaut.',
    text: "Segmenter, n'ouvrir que le nécessaire, tracer le reste. Appliqué au quotidien, pas seulement en audit.",
    skills: ['Tailscale', 'Reverse proxy & TLS', 'VLAN & pare-feu', 'Durcissement', 'Moindre privilège'],
    art: 'lock', ramp: 'sunset', dot: '#FA500F', fig: '03', vert: 'Sécu — 03',
  },
  auto: {
    label: 'Automatisation & IA', short: 'Auto & IA', index: '04 / Automatisation & IA',
    l1: 'Scripter', l2: 'le répétitif.',
    text: "Ce qui se fait deux fois se scripte. Ce qui se scripte se versionne. Et l'IA tourne en local.",
    skills: ['PowerShell', 'Bash', 'Docker & k3s', 'Ollama', 'Home Assistant'],
    art: 'chip', ramp: 'pop', dot: 'var(--note)', fig: '04', vert: 'Auto — 04',
  },
};

/** Couleur du carré de catégorie selon la rampe de l'illustration. */
export const RAMP_DOT: Record<string, string> = {
  green: '#318E68',
  blue: '#0082E6',
  sunset: '#FA500F',
  pop: 'var(--note)',
  ink: 'var(--fg)',
};
