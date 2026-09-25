import type { APIRoute } from 'astro';
import { pixelSvg } from '../lib/pixel';

// Favicon : emblème sunset généré depuis la bibliothèque pixel.
export const GET: APIRoute = () => {
  const s = pixelSvg('emblem', { px: 1 });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s.w} ${s.h}" shape-rendering="crispEdges">${s.body}</svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
