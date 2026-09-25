// Terminal interactif (accueil, planche composants).
// Commandes, textes et rythme repris de reference/Terminal.dc.html.

type Color = 'cream' | 'mute' | 'or' | 'blue' | 'amber' | 'green' | 'red';
type Seg = [text: string, color?: Color];
type Row = Seg[];

interface Config {
  owner: string;
  email: string;
  linkedin: string;
  github: string;
  autoDemo: boolean;
}

const CMDS = ['help', 'whoami', 'ls projets', 'cat stack', 'ping contact', 'history', 'clear'];
const MAX_LINES = 160;

class Terminal {
  private log: HTMLElement;
  private scroller: HTMLElement;
  private echo: HTMLElement;
  private input: HTMLInputElement;
  private status: HTMLElement;
  private cfg: Config;
  private rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  private timers: number[] = [];
  private hist: string[] = [];
  private hi = -1;
  private demo = false;
  private focused = false;
  private released = false;
  private typed = '';

  constructor(private root: HTMLElement) {
    this.log = root.querySelector('[data-tty-log]')!;
    this.scroller = root.querySelector('[data-tty-scroll]')!;
    this.echo = root.querySelector('[data-tty-echo]')!;
    this.input = root.querySelector('[data-tty-input]')!;
    this.status = root.querySelector('[data-tty-status]')!;
    this.cfg = JSON.parse(root.dataset.config || '{}');
    this.bind();
    this.boot();
  }

  destroy() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }

  // ─── Démarrage & démo ─────────────────────────────────────
  private boot() {
    this.push([[['Connexion établie — clé ed25519 vérifiée.', 'mute']]]);
    if (!this.cfg.autoDemo) return this.endDemo(false);
    if (this.rm) {
      this.exec('whoami');
      this.exec('ls projets');
      return this.endDemo(true);
    }
    this.setDemo(true);
    this.script(['whoami', 'ls projets']);
  }

  private later(fn: () => void, ms: number) {
    this.timers.push(window.setTimeout(fn, ms));
  }

  private script(cmds: string[]) {
    let t = 900;
    cmds.forEach((cmd) => {
      [...cmd].forEach((ch) => {
        this.later(() => this.setTyped(this.typed + ch), t);
        t += 55 + ((ch.charCodeAt(0) * 37) % 60);
      });
      t += 320;
      this.later(() => {
        this.setTyped('');
        this.exec(cmd);
      }, t);
      t += 1300;
    });
    this.later(() => this.endDemo(true), t);
  }

  private endDemo(hint: boolean) {
    this.destroy();
    this.setDemo(false);
    this.setTyped('');
    if (hint) this.push([[['→ À vous. Tapez ', 'mute'], ['help', 'amber'], [' ou appuyez sur Tab.', 'mute']]]);
  }

  private setDemo(on: boolean) {
    this.demo = on;
    this.status.textContent = on ? 'démo auto' : 'en ligne';
    this.syncCursor();
  }

  private syncCursor() {
    this.root.toggleAttribute('data-on', this.focused || this.demo);
  }

  private setTyped(v: string) {
    this.typed = v;
    this.echo.textContent = v;
    if (this.input.value !== v) this.input.value = v;
    this.scrollDown();
  }

  // ─── Rendu ────────────────────────────────────────────────
  private push(rows: Row[]) {
    const frag = document.createDocumentFragment();
    rows.forEach((r) => {
      const line = document.createElement('div');
      line.className = 'tty__line';
      r.forEach(([t, c]) => {
        const s = document.createElement('span');
        s.className = `c-${c ?? 'cream'}`;
        s.textContent = t;
        line.appendChild(s);
      });
      frag.appendChild(line);
    });
    this.log.appendChild(frag);
    while (this.log.childElementCount > MAX_LINES) this.log.firstElementChild?.remove();
    this.scrollDown();
  }

  private clear() {
    this.log.replaceChildren();
  }

  private scrollDown() {
    this.scroller.scrollTop = this.scroller.scrollHeight;
  }

  private promptRow(text: string): Row {
    return [['visiteur@homelab', 'or'], [':~$ ', 'mute'], [text, 'cream']];
  }

  // ─── Commandes ────────────────────────────────────────────
  private exec(raw: string) {
    const cmd = raw.trim().replace(/\s+/g, ' ');
    this.push([this.promptRow(raw)]);
    if (!cmd) return;
    this.hist.push(cmd);
    this.hi = -1;
    const { owner, email, linkedin, github } = this.cfg;
    const low = cmd.toLowerCase();

    if (low === 'help')
      return this.push([
        [['Commandes disponibles', 'mute']],
        [['  whoami        ', 'amber'], ['qui je suis']],
        [['  ls projets    ', 'amber'], ['projets phares']],
        [['  cat stack     ', 'amber'], ['technologies du quotidien']],
        [['  ping contact  ', 'amber'], ['me joindre']],
        [['  history       ', 'amber'], ['commandes tapées']],
        [['  clear         ', 'amber'], ["effacer l'écran"]],
      ]);

    if (low === 'whoami')
      return this.push([
        [[owner, 'cream'], [' — administrateur systèmes en ESN', 'mute']],
        [['Windows Server · Hyper-V · Active Directory · Veeam']],
        [['BTS SIO SISR · RNCP AIS · Licence cybersécurité', 'mute']],
        [['Hors prod : Linux, Docker, k3s, homelab sur 3 sites.', 'mute']],
      ]);

    if (low === 'ls projets' || low === 'ls')
      return this.push([
        [['drwxr-x  stockage  ', 'mute'], ['migration-unraid-proxmox/', 'blue']],
        [['drwxr-x  réseau    ', 'mute'], ['tailscale-multisite/', 'blue']],
        [['drwxr-x  ia        ', 'mute'], ['ollama-gpu-passthrough/', 'blue']],
        [['drwxr-x  itsm      ', 'mute'], ['glpi-11-ubuntu/', 'blue']],
        [['drwxr-x  parc      ', 'mute'], ['firmware-hpe-proliant/', 'blue']],
        [['drwxr-x  sécu      ', 'mute'], ['datawipe/', 'blue'], ['  open source', 'amber']],
      ]);

    if (low === 'cat stack')
      return this.push([
        [['[infra]       ', 'amber'], ['Windows Server · Hyper-V · Proxmox VE · ZFS']],
        [['[identité]    ', 'amber'], ['Active Directory · GPO · DNS / DHCP']],
        [['[sauvegarde]  ', 'amber'], ['Veeam B&R · réplication hors site']],
        [['[réseau]      ', 'amber'], ['Tailscale · reverse proxy · VLAN']],
        [['[conteneurs]  ', 'amber'], ['Docker · k3s']],
        [['[outillage]   ', 'amber'], ['GLPI · Home Assistant · PowerShell · Bash']],
        [['[ia]          ', 'amber'], ['Ollama · agents auto-hébergés']],
      ]);

    if (low === 'ping contact' || low === 'ping') {
      this.push([[['PING contact (100.64.0.1) 56 octets de données', 'mute']]]);
      const n = this.rm ? 0 : 420;
      [12, 11, 13].forEach((ms, i) =>
        this.later(
          () => this.push([[[`64 octets de contact : icmp_seq=${i + 1} ttl=64 temps=${ms} ms`]]]),
          n * (i + 1),
        ),
      );
      this.later(
        () =>
          this.push([
            [['3 paquets transmis, 3 reçus, 0 % de perte', 'green']],
            [['email     ', 'amber'], [email]],
            [['linkedin  ', 'amber'], [linkedin]],
            [['github    ', 'amber'], [github]],
          ]),
        n * 4,
      );
      return;
    }

    if (low === 'history') {
      const h = this.hist;
      return this.push(
        h.length ? h.map((c, i): Row => [[`  ${String(i + 1).padStart(3, ' ')}  `, 'mute'], [c]]) : [[['(vide)', 'mute']]],
      );
    }

    if (low === 'clear') return this.clear();

    if (low.startsWith('sudo'))
      return this.push([[['Accès root non accordé. Essayez ', 'mute'], ['ping contact', 'amber'], ['.', 'mute']]]);

    this.push([[[`zsh: commande introuvable : ${cmd}`, 'red']], [['Tapez help pour la liste.', 'mute']]]);
  }

  private complete() {
    const v = this.typed.toLowerCase();
    const m = CMDS.filter((c) => c.startsWith(v));
    if (!v || m.length === 0) {
      if (!v) this.push([[[CMDS.join('   '), 'mute']]]);
      return;
    }
    if (m.length === 1) return this.setTyped(m[0]);
    let p = m[0];
    m.forEach((c) => {
      while (!c.startsWith(p)) p = p.slice(0, -1);
    });
    this.push([this.promptRow(this.typed), [[m.join('   '), 'mute']]]);
    this.setTyped(p);
  }

  // ─── Événements ───────────────────────────────────────────
  private bind() {
    this.root.addEventListener('click', () => {
      if (this.demo) this.endDemo(true);
      this.input.focus({ preventScroll: true });
    });
    this.input.addEventListener('focus', () => {
      this.focused = true;
      this.released = false;
      this.syncCursor();
    });
    this.input.addEventListener('blur', () => {
      this.focused = false;
      this.syncCursor();
    });
    this.input.addEventListener('input', () => {
      if (this.demo) return;
      this.setTyped(this.input.value);
    });
    this.input.addEventListener('keydown', (e) => this.onKey(e));
  }

  private onKey(e: KeyboardEvent) {
    if (this.demo) {
      e.preventDefault();
      this.endDemo(true);
      return;
    }
    // Échap libère le clavier : la prochaine Tabulation quitte le terminal.
    if (e.key === 'Escape') {
      this.released = true;
      return;
    }
    if (e.key === 'Tab' && (this.released || e.shiftKey)) return;
    this.released = false;

    if (e.key === 'Enter') {
      e.preventDefault();
      const v = this.typed;
      this.setTyped('');
      this.exec(v);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      this.complete();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!this.hist.length) return;
      this.hi = this.hi < 0 ? this.hist.length - 1 : Math.max(0, this.hi - 1);
      this.setTyped(this.hist[this.hi]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.hi < 0) return;
      const n = this.hi + 1;
      if (n >= this.hist.length) {
        this.hi = -1;
        this.setTyped('');
      } else {
        this.hi = n;
        this.setTyped(this.hist[n]);
      }
    } else if (e.key.toLowerCase() === 'l' && e.ctrlKey) {
      e.preventDefault();
      this.clear();
    }
  }
}

const live = new Set<Terminal>();

export function mountTerminals() {
  document.querySelectorAll<HTMLElement>('[data-tty]:not([data-tty-live])').forEach((el) => {
    el.dataset.ttyLive = '1';
    live.add(new Terminal(el));
  });
}

document.addEventListener('astro:before-swap', () => {
  live.forEach((t) => t.destroy());
  live.clear();
});
