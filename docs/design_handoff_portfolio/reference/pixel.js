(function () {
  if (window.__pixelLib) return;
  window.__pixelLib = true;

  var RAMPS = {
    sunset: ['#C4001D', '#FA500F', '#FF8204', '#FFAF01'],
    blue: ['#044298', '#0082E6', '#55B3FB', '#B9DAFF'],
    green: ['#005737', '#318E68', '#44BA82', '#94EACC'],
    pop: ['#C4001D', 'var(--note,#B9DAFF)', '#FEC63A', '#FFFFFF'],
    ink: ['#151524', '#3C3C52', '#7C7C90', '#BDBDC6'],
    cream: ['#BDBCB2', '#D9D8CE', '#F2F1E8', '#FFFFFF']
  };
  var SUN5 = ['#FFAF01', '#FF8204', '#FA500F', '#E61300', '#C4001D'];
  var FIX = { k: '#151524', w: '#FFFFFF', c: '#F2F1E8', y: '#FEC63A', p: 'var(--note,#B9DAFF)' };

  function make(w, h, fn) {
    var g = [];
    for (var j = 0; j < h; j++) { g.push(new Array(w).fill('.')); }
    function set(x, y, c) { x |= 0; y |= 0; if (x >= 0 && y >= 0 && x < w && y < h) g[y][x] = c; }
    var api = {
      R: function (x, y, ww, hh, c) { for (var j = y; j < y + hh; j++) for (var i = x; i < x + ww; i++) set(i, j, c); },
      P: function (x, y, c) { set(x, y, c); },
      L: function (x0, y0, x1, y1, c) {
        var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1, dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1, e = dx + dy;
        for (var n = 0; n < 200; n++) { set(x0, y0, c); if (x0 === x1 && y0 === y1) break; var e2 = 2 * e; if (e2 >= dy) { e += dy; x0 += sx; } if (e2 <= dx) { e += dx; y0 += sy; } }
      },
      C: function (cx, cy, r, c) { for (var j = cy - r; j <= cy + r; j++) for (var i = cx - r; i <= cx + r; i++) if ((i - cx) * (i - cx) + (j - cy) * (j - cy) <= r * r + r * 0.6) set(i, j, c); }
    };
    fn(api);
    return g.map(function (r) { return r.join(''); });
  }

  var ART = {};

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
    '....................'
  ];

  ART.infra = make(20, 20, function (a) {
    [1, 7, 13].forEach(function (y) {
      a.R(2, y, 16, 5, '2'); a.R(2, y, 16, 1, '3'); a.R(2, y + 4, 16, 1, '1');
      a.R(4, y + 2, 2, 1, 'y'); a.P(7, y + 2, '4'); a.R(11, y + 2, 5, 1, '1');
    });
    a.R(3, 18, 2, 1, '1'); a.R(15, 18, 2, 1, '1');
  });

  ART.backup = make(20, 20, function (a) {
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

  ART.lock = make(20, 20, function (a) {
    a.R(5, 1, 10, 8, '1'); a.R(7, 3, 6, 6, '.'); a.R(6, 2, 1, 6, '2');
    a.R(3, 8, 14, 11, '3'); a.R(3, 8, 14, 1, '4'); a.R(3, 8, 1, 11, '4');
    a.R(16, 9, 1, 10, '2'); a.R(3, 18, 14, 1, '1');
    a.R(8, 11, 4, 3, 'k'); a.R(9, 14, 2, 3, 'k');
    a.P(17, 2, 'y'); a.P(16, 3, 'y'); a.P(17, 3, 'y'); a.P(18, 3, 'y'); a.P(17, 4, 'y');
  });

  ART.chip = make(20, 20, function (a) {
    [6, 8, 11, 13].forEach(function (x) { a.R(x, 2, 1, 3, '3'); a.R(x, 15, 1, 3, '3'); a.R(2, x, 3, 1, '3'); a.R(15, x, 3, 1, '3'); });
    a.R(5, 5, 10, 10, '2'); a.R(5, 5, 10, 1, '4');
    a.R(7, 7, 6, 6, '1'); a.R(8, 8, 2, 2, '4');
    a.P(17, 0, 'y'); a.P(16, 1, 'y'); a.P(17, 1, 'y'); a.P(18, 1, 'y'); a.P(17, 2, 'y');
  });

  ART.migrate = make(20, 20, function (a) {
    a.R(1, 4, 6, 12, '1'); a.R(1, 4, 6, 1, '2');
    a.R(2, 7, 4, 1, '2'); a.R(2, 10, 4, 1, '2'); a.R(2, 13, 4, 1, '2');
    a.R(13, 3, 6, 14, '3'); a.R(13, 3, 6, 1, '4');
    a.R(14, 6, 4, 1, '2'); a.R(14, 9, 4, 1, '2'); a.R(14, 12, 4, 1, '2'); a.P(17, 15, 'y');
    a.R(7, 9, 3, 2, 'y'); a.R(10, 7, 1, 6, 'y'); a.R(11, 8, 1, 4, 'y'); a.R(12, 9, 1, 2, 'y');
    a.R(1, 18, 18, 1, '2');
  });

  ART.network = make(20, 20, function (a) {
    a.L(8, 6, 4, 12, '3'); a.L(11, 6, 15, 12, '3'); a.L(6, 15, 13, 15, '3');
    a.R(7, 1, 6, 5, '2'); a.R(7, 1, 6, 1, '4'); a.R(9, 3, 2, 1, 'y');
    a.R(1, 13, 6, 5, '2'); a.R(1, 13, 6, 1, '4'); a.R(3, 15, 2, 1, 'y');
    a.R(13, 13, 6, 5, '2'); a.R(13, 13, 6, 1, '4'); a.R(15, 15, 2, 1, 'y');
    a.P(6, 9, 'w'); a.P(13, 9, 'w'); a.P(9, 15, 'w'); a.P(10, 15, 'w');
  });

  ART.ticket = make(20, 20, function (a) {
    a.R(3, 3, 14, 16, '1'); a.R(3, 3, 14, 1, '2');
    a.R(5, 5, 10, 12, 'w');
    a.R(7, 2, 6, 3, 'k'); a.R(8, 2, 4, 1, '3');
    a.R(7, 8, 6, 1, '3'); a.R(7, 10, 4, 1, '3');
    [[7, 13], [8, 14], [9, 15], [10, 14], [11, 13], [12, 12], [13, 11]].forEach(function (p) { a.P(p[0], p[1], '2'); });
  });

  ART.firmware = make(20, 20, function (a) {
    a.R(9, 1, 2, 1, '4'); a.R(8, 2, 4, 1, '4'); a.R(7, 3, 6, 1, '4'); a.R(6, 4, 8, 1, '4'); a.R(9, 5, 2, 4, '4');
    a.R(2, 11, 16, 7, '2'); a.R(2, 11, 16, 1, '3'); a.R(2, 17, 16, 1, '1');
    a.R(4, 14, 2, 1, 'y'); a.R(10, 13, 6, 1, '1'); a.R(10, 15, 6, 1, '1');
    a.R(3, 18, 2, 1, '1'); a.R(15, 18, 2, 1, '1');
  });

  ART.wipe = make(20, 20, function (a) {
    a.R(3, 1, 11, 15, 'k'); a.R(4, 2, 9, 13, 'w');
    a.R(5, 4, 6, 1, '3'); a.R(5, 6, 7, 1, '3'); a.R(5, 8, 5, 1, '3'); a.R(5, 10, 6, 1, '3');
    a.C(14, 14, 5, '1'); a.C(14, 14, 4, '2');
    a.L(12, 12, 16, 16, 'w'); a.L(16, 12, 12, 16, 'w'); a.L(13, 12, 16, 15, 'w'); a.L(15, 12, 12, 15, 'w');
  });

  ART.loupe = make(20, 20, function (a) {
    a.C(8, 8, 7, '1'); a.C(8, 8, 5, '.');
    a.R(5, 5, 3, 1, '4'); a.R(5, 6, 1, 2, '4');
    a.L(13, 13, 18, 18, '2'); a.L(14, 13, 18, 17, '2'); a.L(13, 14, 17, 18, '2');
    a.L(12, 14, 13, 15, '2'); a.L(14, 12, 15, 13, '2');
    a.P(17, 2, 'y'); a.P(16, 3, 'y'); a.P(17, 3, 'y'); a.P(18, 3, 'y'); a.P(17, 4, 'y');
  });

  function mascot(f) {
    return make(16, 16, function (a) {
      var dy = f === 'b' ? -1 : 0;
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

  window.PixelArtLib = { ART: ART, RAMPS: RAMPS };

  function svgFor(name, opts) {
    var g = ART[name];
    if (!g) return '';
    var h = g.length, w = g[0].length;
    var ys = [];
    for (var y = 0; y < h; y++) if (/[^.]/.test(g[y])) ys.push(y);
    var y0 = ys[0] || 0, y1 = ys[ys.length - 1] || 0;
    var variant = opts.variant || 'color';
    var ramp = RAMPS[variant === 'ink' ? 'ink' : (opts.ramp || 'sunset')] || RAMPS.sunset;
    function col(ch, y) {
      if (variant === 'white') return '#FFFFFF';
      if (variant === 'cream') return '#F2F1E8';
      if (ch === '*') {
        if (variant === 'ink') return '#151524';
        return SUN5[Math.min(4, Math.round((y - y0) / Math.max(1, y1 - y0) * 4))];
      }
      if (ch >= '1' && ch <= '4') return ramp[+ch - 1];
      if (variant === 'ink' && (ch === 'y' || ch === 'p')) return '#F2F1E8';
      return FIX[ch] || '#151524';
    }
    var out = '';
    for (var yy = 0; yy < h; yy++) {
      var r = g[yy], x = 0;
      while (x < w) {
        var ch = r[x];
        if (!ch || ch === '.') { x++; continue; }
        var c = col(ch, yy), x2 = x + 1;
        while (x2 < w && r[x2] && r[x2] !== '.' && col(r[x2], yy) === c) x2++;
        out += '<rect x="' + x + '" y="' + yy + '" width="' + (x2 - x) + '" height="1" style="fill:' + c + '"/>';
        x = x2;
      }
    }
    if (opts.grid) {
      var d = '';
      for (var i = 0; i <= w; i++) d += 'M' + i + ' 0V' + h;
      for (var j = 0; j <= h; j++) d += 'M0 ' + j + 'H' + w;
      out += '<path d="' + d + '" stroke="' + (opts.grid === 'light' ? 'rgba(242,241,232,.18)' : 'rgba(21,21,36,.14)') + '" stroke-width="0.05" fill="none"/>';
    }
    var s = opts.px || 8;
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + (w * s) + '" height="' + (h * s) + '" shape-rendering="crispEdges" style="display:block" aria-hidden="true">' + out + '</svg>';
  }

  var RM = function () { return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; };

  class PixelArt extends HTMLElement {
    static get observedAttributes() { return ['art', 'ramp', 'variant', 'px', 'grid', 'frames', 'fps', 'hover']; }
    connectedCallback() {
      this.style.display = 'inline-block';
      this.style.lineHeight = '0';
      this._draw();
      this._anim();
      this._hover();
    }
    disconnectedCallback() { clearInterval(this._t); if (this._unhover) this._unhover(); }
    attributeChangedCallback() { if (this.isConnected) this._draw(); }
    _draw() {
      var frames = (this.getAttribute('frames') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      var name = this._cur || this.getAttribute('art') || frames[0];
      var g = this.getAttribute('grid');
      this.innerHTML = svgFor(name, {
        ramp: this.getAttribute('ramp'),
        variant: this.getAttribute('variant'),
        px: parseFloat(this.getAttribute('px')) || 8,
        grid: g && g !== 'false' ? g : null
      });
    }
    _anim() {
      clearInterval(this._t);
      var f = (this.getAttribute('frames') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      if (f.length < 2) return;
      this._cur = f[0]; this._draw();
      if (RM()) return;
      var i = 0, self = this, fps = parseFloat(this.getAttribute('fps')) || 3;
      this._t = setInterval(function () { i = (i + 1) % f.length; self._cur = f[i]; self._draw(); }, 1000 / fps);
    }
    _hover() {
      var h = this.getAttribute('hover');
      if (!h || h === 'false') return;
      var host = this.closest('[data-hover-host]');
      if (!host) return;
      var self = this;
      this.style.transition = RM() ? 'none' : 'filter .5s cubic-bezier(.16,1,.3,1), opacity .5s cubic-bezier(.16,1,.3,1)';
      var off = function () { self.style.filter = 'grayscale(1) contrast(1.1)'; self.style.opacity = '.62'; };
      var on = function () { self.style.filter = 'none'; self.style.opacity = '1'; };
      off();
      host.addEventListener('mouseenter', on); host.addEventListener('mouseleave', off);
      host.addEventListener('focusin', on); host.addEventListener('focusout', off);
      this._unhover = function () {
        host.removeEventListener('mouseenter', on); host.removeEventListener('mouseleave', off);
        host.removeEventListener('focusin', on); host.removeEventListener('focusout', off);
      };
    }
  }
  customElements.define('pixel-art', PixelArt);

  var NOISE = 'data:image/svg+xml,' + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>");

  class PxGrain extends HTMLElement {
    static get observedAttributes() { return ['opacity', 'blend']; }
    connectedCallback() { this._s(); }
    attributeChangedCallback() { this._s(); }
    _s() {
      this.style.cssText = 'position:absolute;inset:0;pointer-events:none;display:block;background-image:url("' + NOISE + '");background-size:180px 180px;opacity:' + (this.getAttribute('opacity') || '.4') + ';mix-blend-mode:' + (this.getAttribute('blend') || 'overlay') + ';z-index:1';
    }
  }
  customElements.define('px-grain', PxGrain);
})();
