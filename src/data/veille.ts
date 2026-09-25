// Veille — radar, sujets et sources. Les entrées sont dans src/content/veille/AAAA-MM-JJ-slug.md

export const TOPIC_KEYS = ['virtu', 'secu', 'backup', 'conteneurs', 'ia', 'windows', 'reglementaire'] as const;
export type TopicKey = (typeof TOPIC_KEYS)[number];

export const TOPICS: Record<TopicKey, { label: string; dot: string }> = {
  virtu: { label: 'Virtualisation', dot: '#0082E6' },
  secu: { label: 'Sécurité · CVE', dot: '#FA500F' },
  backup: { label: 'Sauvegarde', dot: '#318E68' },
  conteneurs: { label: 'Conteneurs', dot: '#55B3FB' },
  ia: { label: 'IA locale', dot: 'var(--note)' },
  windows: { label: 'Windows Server', dot: 'var(--fg)' },
  reglementaire: { label: 'Réglementaire', dot: '#FEC63A' },
};

export const RADAR = [
  { ring: 'Adopté', dot: '#44BA82', items: ['Proxmox VE', 'ZFS', 'Tailscale', 'Veeam B&R', 'PowerShell'] },
  { ring: "À l'essai", dot: '#FEC63A', items: ['k3s', 'Ollama', 'Ansible', 'Agents IA'] },
  { ring: 'À surveiller', dot: 'var(--note)', items: ['Hotpatch WS 2025', 'NIS 2', 'Passkeys / FIDO2', 'eBPF'] },
];

export const SOURCES = [
  { name: 'CERT-FR', type: 'Avis & alertes' },
  { name: 'ANSSI', type: 'Guides' },
  { name: 'Microsoft Tech Community', type: 'Blog éditeur' },
  { name: 'Forum Proxmox', type: 'Communauté' },
  { name: 'NoLimitSecu', type: 'Podcast' },
  { name: 'r/homelab', type: 'Communauté' },
];

export const RYTHME = 'hebdo';
