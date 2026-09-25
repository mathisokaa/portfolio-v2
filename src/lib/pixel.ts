// Bibliothèque pixel art — port TypeScript de reference/pixel.js (source de vérité).
// Génère des SVG au build ; seules la mascotte animée et l'effet de survol vivent côté client.

export type Ramp = 'sunset' | 'blue' | 'green' | 'pop' | 'ink' | 'cream';
export type Variant = 'color' | 'ink' | 'white' | 'cream';
export type ArtName =
  | 'emblem' | 'infra' | 'backup' | 'lock' | 'chip' | 'migrate' | 'network'
  | 'ticket' | 'firmware' | 'wipe' | 'loupe' | 'mascot-a' | 'mascot-b' | 'mascot-c';

export const RAMPS: Record<Ramp, [string, string, string, string]> = {
  sunset: ['#C4001D', '#FA500F', '#FF8204', '#FFAF01'],
  blue: ['#044298', '#0082E6', '#55B3FB', '#B9DAFF'],
  green: ['#005737', '#318E68', '#44BA82', '#94EACC'],
  pop: ['#C4001D', 'var(--note,#B9DAFF)', '#FEC63A', '#FFFFFF'],
  ink: ['#151524', '#3C3C52', '#7C7C90', '#BDBDC6'],
  cream: ['#BDBCB2', '#D9D8CE', '#F2F1E8', '#FFFFFF'],
};
const SUN5 = ['#FFAF01', '#FF8204', '#FA500F', '#E61300', '#C4001D'];
const FIX: Record<string, string> = { k: '#151524', w: '#FFFFFF', c: '#F2F1E8', y: '#FEC63A', p: 'var(--note,#B9DAFF)' };

interface Api {
  R(x: number, y: number, w: number, h: number, c: string): void;
  P(x: number, y: number, c: string): void;
  L(x0: number, y0: number, x1: number, y1: number, c: string): void;
  C(cx: number, cy: number, r: number, c: string): void;
}

function make(w: number, h: number, fn: (a: Api) => void): string[] {
  const g: string[][] = [];
  for (let j = 0; j < h; j++) g.push(new Array(w).fill('.'));
  const set = (x: number, y: number, c: string) => {
    x |= 0; y |= 0;
    if (x >= 0 && y >= 0 && x < w && y < h) g[y][x] = c;
  };
  fn({
    R(x, y, ww, hh, c) { for (let j = y; j < y + hh; j++) for (let i = x; i < x + ww; i++) set(i, j, c); },
    P(x, y, c) { set(x, y, c); },
    L(x0, y0, x1, y1, c) {
      const dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1, dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
      let e = dx + dy;
      for (let n = 0; n < 200; n++) {
        set(x0, y0, c);
        if (x0 === x1 && y0 === y1) break;
        const e2 = 2 * e;
        if (e2 >= dy) { e += dy; x0 += sx; }
        if (e2 <= dx) { e += dx; y0 += sy; }
      }
    },
    C(cx, cy, r, c) {
      for (let j = cy - r; j <= cy + r; j++)
        for (let i = cx - r; i <= cx + r; i++)
          if ((i - cx) * (i - cx) + (j - cy) * (j - cy) <= r * r + r * 0.6) set(i, j, c);
    },
  });
  return g.map((r) => r.join(''));
}

export const ART: Record<ArtName, string[]> = {} as Record<ArtName, string[]>;

// Emblème : baie serveur 3U, prompt >_ découpé dans l'unité haute
ART.emblem = [
  '....................',
  '.******************.',
  '.******************.',
  '.**..**************.',
  '.***..*************.',
  '.****..************.',
  '.***..*************.',
  '.**..***.....******.',
  '.******************.',
  '....................',
  '.******************.',
  '.**..********.*.*.*.',
  '.******************.',
  '....................',
  '.******************.',
  '.**..********.*.*.*.',
  '.******************.',
  '....................',
  '..**............**..',
  '....................',
];

ART.infra = make(20, 20, (a) => {
  [1, 7, 13].forEach((y) => {
    a.R(2, y, 16, 5, '2'); a.R(2, y, 16, 1, '3'); a.R(2, y + 4, 16, 1, '1');
    a.R(4, y + 2, 2, 1, 'y'); a.P(7, y + 2, '4'); a.R(11, y + 2, 5, 1, '1');
  });
  a.R(3, 18, 2, 1, '1'); a.R(15, 18, 2, 1, '1');
});

ART.backup = make(20, 20, (a) => {
  a.R(3, 4, 14, 13, '2');
  a.R(5, 3, 10, 1, '4'); a.R(4, 4, 12, 1, '4'); a.R(3, 5, 14, 1, '4');
  a.P(3, 4, '.'); a.P(16, 4, '.');
  a.R(4, 6, 12, 1, '3');
  a.R(4, 7, 1, 9, '3');
  a.R(3, 10, 14, 1, '1'); a.R(3, 14, 14, 1, '1');
  a.R(3, 16, 1, 1, '.'); a.R(16, 16, 1, 1, '.'); a.R(4, 17, 12, 1, '1');
  a.R(11, 11, 8, 8, 'k');
  a.R(13, 13, 3, 1, 'w'); a.R(12, 14, 1, 3, 'w'); a.R(13, 17, 3, 1, 'w'); a.R(16, 15, 1, 2, 'w');
  a.R(16, 12, 1, 3, 'w'); a.P(17, 13, 'w');
});

ART.lock = make(20, 20, (a) => {
  a.R(5, 1, 10, 8, '1'); a.R(7, 3, 6, 6, '.'); a.R(6, 2, 1, 6, '2');
  a.R(3, 8, 14, 11, '3'); a.R(3, 8, 14, 1, '4'); a.R(3, 8, 1, 11, '4');
  a.R(16, 9, 1, 10, '2'); a.R(3, 18, 14, 1, '1');
  a.R(8, 11, 4, 3, 'k'); a.R(9, 14, 2, 3, 'k');
  a.P(17, 2, 'y'); a.P(16, 3, 'y'); a.P(17, 3, 'y'); a.P(18, 3, 'y'); a.P(17, 4, 'y');
});

ART.chip = make(20, 20, (a) => {
  [6, 8, 11, 13].forEach((x) => { a.R(x, 2, 1, 3, '3'); a.R(x, 15, 1, 3, '3'); a.R(2, x, 3, 1, '3'); a.R(15, x, 3, 1, '3'); });
  a.R(5, 5, 10, 10, '2'); a.R(5, 5, 10, 1, '4');
  a.R(7, 7, 6, 6, '1'); a.R(8, 8, 2, 2, '4');
  a.P(17, 0, 'y'); a.P(16, 1, 'y'); a.P(17, 1, 'y'); a.P(18, 1, 'y'); a.P(17, 2, 'y');
});

ART.migrate = make(20, 20, (a) => {
  a.R(1, 4, 6, 12, '1'); a.R(1, 4, 6, 1, '2');
  a.R(2, 7, 4, 1, '2'); a.R(2, 10, 4, 1, '2'); a.R(2, 13, 4, 1, '2');
  a.R(13, 3, 6, 14, '3'); a.R(13, 3, 6, 1, '4');
  a.R(14, 6, 4, 1, '2'); a.R(14, 9, 4, 1, '2'); a.R(14, 12, 4, 1, '2'); a.P(17, 15, 'y');
  a.R(7, 9, 3, 2, 'y'); a.R(10, 7, 1, 6, 'y'); a.R(11, 8, 1, 4, 'y'); a.R(12, 9, 1, 2, 'y');
  a.R(1, 18, 18, 1, '2');
});

ART.network = make(20, 20, (a) => {
  a.L(8, 6, 4, 12, '3'); a.L(11, 6, 15, 12, '3'); a.L(6, 15, 13, 15, '3');
  a.R(7, 1, 6, 5, '2'); a.R(7, 1, 6, 1, '4'); a.R(9, 3, 2, 1, 'y');
  a.R(1, 13, 6, 5, '2'); a.R(1, 13, 6, 1, '4'); a.R(3, 15, 2, 1, 'y');
  a.R(13, 13, 6, 5, '2'); a.R(13, 13, 6, 1, '4'); a.R(15, 15, 2, 1, 'y');
  a.P(6, 9, 'w'); a.P(13, 9, 'w'); a.P(9, 15, 'w'); a.P(10, 15, 'w');
});

ART.ticket = make(20, 20, (a) => {
  a.R(3, 3, 14, 16, '1'); a.R(3, 3, 14, 1, '2');
  a.R(5, 5, 10, 12, 'w');
  a.R(7, 2, 6, 3, 'k'); a.R(8, 2, 4, 1, '3');
  a.R(7, 8, 6, 1, '3'); a.R(7, 10, 4, 1, '3');
  [[7, 13], [8, 14], [9, 15], [10, 14], [11, 13], [12, 12], [13, 11]].forEach(([x, y]) => a.P(x, y, '2'));
});

ART.firmware = make(20, 20, (a) => {
  a.R(9, 1, 2, 1, '4'); a.R(8, 2, 4, 1, '4'); a.R(7, 3, 6, 1, '4'); a.R(6, 4, 8, 1, '4'); a.R(9, 5, 2, 4, '4');
  a.R(2, 11, 16, 7, '2'); a.R(2, 11, 16, 1, '3'); a.R(2, 17, 16, 1, '1');
  a.R(4, 14, 2, 1, 'y'); a.R(10, 13, 6, 1, '1'); a.R(10, 15, 6, 1, '1');
  a.R(3, 18, 2, 1, '1'); a.R(15, 18, 2, 1, '1');
});

ART.wipe = make(20, 20, (a) => {
  a.R(3, 1, 11, 15, 'k'); a.R(4, 2, 9, 13, 'w');
  a.R(5, 4, 6, 1, '3'); a.R(5, 6, 7, 1, '3'); a.R(5, 8, 5, 1, '3'); a.R(5, 10, 6, 1, '3');
  a.C(14, 14, 5, '1'); a.C(14, 14, 4, '2');
  a.L(12, 12, 16, 16, 'w'); a.L(16, 12, 12, 16, 'w'); a.L(13, 12, 16, 15, 'w'); a.L(15, 12, 12, 15, 'w');
});

ART.loupe = make(20, 20, (a) => {
  a.C(8, 8, 7, '1'); a.C(8, 8, 5, '.');
  a.R(5, 5, 3, 1, '4'); a.R(5, 6, 1, 2, '4');
  a.L(13, 13, 18, 18, '2'); a.L(14, 13, 18, 17, '2'); a.L(13, 14, 17, 18, '2');
  a.L(12, 14, 13, 15, '2'); a.L(14, 12, 15, 13, '2');
  a.P(17, 2, 'y'); a.P(16, 3, 'y'); a.P(17, 3, 'y'); a.P(18, 3, 'y'); a.P(17, 4, 'y');
});

function mascot(f: 'a' | 'b' | 'c'): string[] {
  return make(16, 16, (a) => {
    const dy = f === 'b' ? -1 : 0;
    a.R(7, 1 + dy, 1, 2, '1'); a.P(7, 0 + dy, f === 'b' ? '4' : 'y');
    a.R(3, 3 + dy, 10, 9, '2'); a.R(3, 3 + dy, 10, 1, '3'); a.R(3, 11 + dy, 10, 1, '1');
    a.R(5, 5 + dy, 6, 4, 'k');
    if (f === 'c') { a.R(6, 7 + dy, 1, 1, 'y'); a.R(9, 7 + dy, 1, 1, 'y'); }
    else if (f === 'b') { a.R(7, 6 + dy, 1, 2, 'y'); a.R(10, 6 + dy, 1, 2, 'y'); }
    else { a.R(6, 6 + dy, 1, 2, 'y'); a.R(9, 6 + dy, 1, 2, 'y'); }
    a.R(2, 7 + dy, 1, 3, '1'); a.R(13, f === 'b' ? 5 + dy : 7 + dy, 1, 3, '1');
    if (f === 'b') { a.R(4, 11, 2, 4, '1'); a.R(10, 11, 2, 4, '1'); }
    else { a.R(4, 12, 2, 3, '1'); a.R(10, 12, 2, 3, '1'); }
    a.R(3, 15, 3, 1, '1'); a.R(10, 15, 3, 1, '1');
  });
}
ART['mascot-a'] = mascot('a');
ART['mascot-b'] = mascot('b');
ART['mascot-c'] = mascot('c');

export interface SvgOptions {
  ramp?: Ramp;
  variant?: Variant;
  px?: number;
  grid?: 'light' | 'dark' | boolean;
}

/** Contenu SVG (runs horizontaux fusionnés en <rect>) + dimensions de la grille. */
export function pixelSvg(name: ArtName, opts: SvgOptions = {}) {
  const g = ART[name];
  const h = g.length;
  const w = g[0].length;
  const ys: number[] = [];
  for (let y = 0; y < h; y++) if (/[^.]/.test(g[y])) ys.push(y);
  const y0 = ys[0] ?? 0;
  const y1 = ys[ys.length - 1] ?? 0;
  const variant = opts.variant ?? 'color';
  const ramp = RAMPS[variant === 'ink' ? 'ink' : opts.ramp ?? 'sunset'] ?? RAMPS.sunset;

  const col = (ch: string, y: number): string => {
    if (variant === 'white') return '#FFFFFF';
    if (variant === 'cream') return '#F2F1E8';
    if (ch === '*') {
      if (variant === 'ink') return '#151524';
      return SUN5[Math.min(4, Math.round(((y - y0) / Math.max(1, y1 - y0)) * 4))];
    }
    if (ch >= '1' && ch <= '4') return ramp[+ch - 1];
    if (variant === 'ink' && (ch === 'y' || ch === 'p')) return '#F2F1E8';
    return FIX[ch] ?? '#151524';
  };

  let out = '';
  for (let yy = 0; yy < h; yy++) {
    const r = g[yy];
    let x = 0;
    while (x < w) {
      const ch = r[x];
      if (!ch || ch === '.') { x++; continue; }
      const c = col(ch, yy);
      let x2 = x + 1;
      while (x2 < w && r[x2] && r[x2] !== '.' && col(r[x2], yy) === c) x2++;
      out += `<rect x="${x}" y="${yy}" width="${x2 - x}" height="1" style="fill:${c}"/>`;
      x = x2;
    }
  }
  if (opts.grid) {
    let d = '';
    for (let i = 0; i <= w; i++) d += `M${i} 0V${h}`;
    for (let j = 0; j <= h; j++) d += `M0 ${j}H${w}`;
    const stroke = opts.grid === 'light' ? 'rgba(242,241,232,.18)' : 'rgba(21,21,36,.14)';
    out += `<path d="${d}" stroke="${stroke}" stroke-width="0.05" fill="none"/>`;
  }
  const s = opts.px ?? 8;
  return { w, h, width: w * s, height: h * s, body: out };
}
