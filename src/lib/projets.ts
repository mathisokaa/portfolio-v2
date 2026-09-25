import { getCollection, type CollectionEntry } from 'astro:content';
import { RAMP_DOT } from '../data/domaines';

export type Projet = CollectionEntry<'projets'>;

export async function getProjets() {
  return (await getCollection('projets')).sort((a, b) => a.data.ordre - b.data.ordre);
}

export const num = (n: number) => String(n).padStart(2, '0');
export const dotOf = (p: Projet) => RAMP_DOT[p.data.ramp] ?? 'var(--fg)';
export const hasEtude = (p: Projet) => Boolean(p.data.etude);
/** Page d'étude de cas si elle existe, sinon la liste filtrée sur le premier domaine. */
export const hrefOf = (p: Projet) =>
  p.data.etude ? `/projets/${p.id}` : `/projets?domaine=${p.data.domaines[0]}`;
