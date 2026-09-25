import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { DOMAIN_KEYS } from './data/domaines';
import { TOPIC_KEYS } from './data/veille';

const ARTS = ['emblem', 'infra', 'backup', 'lock', 'chip', 'migrate', 'network', 'ticket', 'firmware', 'wipe', 'loupe'] as const;
const RAMPS = ['sunset', 'blue', 'green', 'pop', 'ink'] as const;

const ligneCode = z.union([
  z.object({ cmd: z.string() }),
  z.object({ cle: z.string(), valeur: z.string(), ok: z.boolean().default(true) }),
]);

const etude = z.object({
  titre: z.tuple([z.string(), z.string()]),
  sousTitre: z.string(),
  legende: z.string(),
  meta: z.object({
    role: z.string(),
    periode: z.string(),
    contexte: z.string(),
    statut: z.string(),
  }),
  contexte: z.object({ titre: z.string() }),
  probleme: z.object({ titre: z.string(), texte: z.string(), contraintes: z.array(z.string()).min(1) }),
  solution: z.object({
    titre: z.string(),
    etapes: z.array(z.object({ titre: z.string(), texte: z.string() })).min(1),
    code: z.object({ titre: z.string(), lang: z.string(), lignes: z.array(ligneCode) }).optional(),
  }),
  resultats: z.object({
    titre: z.string(),
    chiffres: z.array(z.object({ valeur: z.string(), label: z.string() })).min(1),
    texte: z.string().optional(),
  }),
  schema: z.object({
    source: z.object({ nom: z.string(), detail: z.string() }),
    lien: z.object({ haut: z.string(), bas: z.string() }),
    cible: z.object({ nom: z.string(), elements: z.array(z.string()), note: z.string(), icone: z.enum(ARTS).optional() }),
  }),
  stack: z.array(z.object({ label: z.string(), couleur: z.string() })),
});

const projets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projets' }),
  schema: z.object({
    titre: z.string(),
    ordre: z.number().int().positive(),
    domaines: z.array(z.enum(DOMAIN_KEYS)).min(1),
    categorie: z.string(),
    art: z.enum(ARTS),
    ramp: z.enum(RAMPS),
    legende: z.string(),
    impact: z.string(),
    stack: z.array(z.string()),
    /** Libellé du pied de carte sur l'accueil (Étude de cas, Homelab, Production, GitHub…) */
    contexte: z.string(),
    /** Titre sur deux lignes pour le bandeau « Projet suivant » */
    accroche: z.tuple([z.string(), z.string()]).optional(),
    etude: etude.optional(),
  }),
});

const veille = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/veille' }),
  schema: z.object({
    date: z.coerce.date(),
    sujet: z.enum(TOPIC_KEYS),
    titre: z.string(),
    source: z.string(),
    url: z.string(),
  }),
});

export const collections = { projets, veille };
