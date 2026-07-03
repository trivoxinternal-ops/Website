/* TRIVOX interactive feature visuals — vanilla canvas + SVG, no deps.
   brain = AI system architecture node network, flow = workflow hub, crm = pipeline. */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  function E(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  /* ---------- BRAIN: canvas node network ---------- */
  function initBrain(el) {
    const canvas = el.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, dpr = 1, nodes = [], raf = null, mx = 0.5, my = 0.5, t0 = 0;
    const signals = [];
    function size() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      const r = el.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function build() {
      nodes = [];
      const N = Math.round(Math.min(160, Math.max(90, W / 4.2)));
      for (let i = 0; i < N; i++) {
        const side = Math.random() < 0.5 ? -1 : 1;
        const a = Math.random() * Math.PI * 2, r = Math.pow(Math.random(), 0.7);
        const x = 0.5 + side * 0.16 + Math.cos(a) * 0.23 * r;
        const y = 0.44 + Math.sin(a) * 0.32 * r;
        nodes.push({ bx: x, by: y, x, y, ph: Math.random() * 6.28, sp: 0.3 + Math.random() * 0.5, bright: Math.random() < 0.34 });
      }
    }
    function spawnSignal() {
      if (nodes.length < 2) return;
      const a = nodes[(Math.random() * nodes.length) | 0];
      let b = null, bd = 0.15;
      for (const n of nodes) { if (n === a) continue; const d = Math.hypot(n.x - a.x, n.y - a.y); if (d < bd) { bd = d; b = n; } }
      if (b) signals.push({ a, b, t: 0, sp: 0.6 + Math.random() * 0.8 });
    }
    function frame(now) {
      const dt = Math.min(0.05, (now - t0) / 1000); t0 = now;
      ctx.clearRect(0, 0, W, H);
      const ox = (mx - 0.5) * 0.05, oy = (my - 0.5) * 0.05;
      for (const n of nodes) { n.ph += dt * n.sp; n.x = n.bx + Math.cos(n.ph) * 0.012 + ox; n.y = n.by + Math.sin(n.ph * 1.1) * 0.012 + oy; }
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 0.15) { const o = (1 - d / 0.15) * 0.9; ctx.strokeStyle = 'rgba(126,158,255,' + o.toFixed(3) + ')'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.moveTo(a.x * W, a.y * H); ctx.lineTo(b.x * W, b.y * H); ctx.stroke(); }
      }
      if (!reduce && Math.random() < 0.11) spawnSignal();
      ctx.shadowColor = 'rgba(0,240,255,0.9)';
      for (let k = signals.length - 1; k >= 0; k--) {
        const s = signals[k]; s.t += dt * s.sp;
        if (s.t >= 1) { signals.splice(k, 1); continue; }
        const x = (s.a.x + (s.b.x - s.a.x) * s.t) * W, y = (s.a.y + (s.b.y - s.a.y) * s.t) * H;
        ctx.shadowBlur = 8; ctx.fillStyle = 'rgba(0,240,255,1)'; ctx.beginPath(); ctx.arc(x, y, 2.9, 0, 7); ctx.fill();
      }
      ctx.shadowBlur = 0;
      for (const n of nodes) {
        const x = n.x * W, y = n.y * H, tw = 0.6 + 0.4 * Math.sin(n.ph * 2);
        if (n.bright) {
          ctx.fillStyle = 'rgba(0,240,255,0.22)'; ctx.beginPath(); ctx.arc(x, y, 7.5, 0, 7); ctx.fill();
          ctx.shadowColor = 'rgba(0,240,255,0.9)'; ctx.shadowBlur = 7;
          ctx.fillStyle = 'rgba(120,244,255,' + (0.75 + 0.25 * tw) + ')'; ctx.beginPath(); ctx.arc(x, y, 3, 0, 7); ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = 'rgba(184,204,255,' + (0.5 + 0.4 * tw) + ')'; ctx.beginPath(); ctx.arc(x, y, 1.9, 0, 7); ctx.fill();
        }
      }
      raf = requestAnimationFrame(frame);
    }
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); mx = (e.clientX - r.left) / r.width; my = (e.clientY - r.top) / r.height; });
    el.addEventListener('pointerleave', () => { mx = 0.5; my = 0.5; });
    addEventListener('resize', () => { size(); build(); });
    size(); build();
    return {
      start() { if (!raf) { t0 = performance.now(); raf = requestAnimationFrame(frame); } },
      stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } },
      once() { t0 = performance.now() - 16; frame(performance.now()); this.stop(); }
    };
  }

  /* ---------- FLOW: workflow hub ---------- */
  function initFlow(el) {
    const svg = E('svg', { viewBox: '0 0 300 300', preserveAspectRatio: 'xMidYMid meet' });
    const defs = E('defs', null, svg);
    const g = E('radialGradient', { id: 'coreg' }, defs);
    E('stop', { offset: '0', 'stop-color': '#8fb0ff' }, g);
    E('stop', { offset: '1', 'stop-color': '#2E61FE' }, g);
    const cx = 150, cy = 150, R = 74, R2 = 114;
    const items = [['CRM', 0], ['Finance', 60], ['Email', 120], ['Data', 180], ['ERP', 240], ['HR', 300]];
    const P = items.map(([label, deg]) => {
      const a = (deg - 90) * Math.PI / 180;
      return { label, x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R, lx: cx + Math.cos(a) * R2, ly: cy + Math.sin(a) * R2 };
    });
    // hexagon ring: connect adjacent primaries (mesh, not just a star)
    P.forEach((p, i) => { const q = P[(i + 1) % P.length]; E('line', { x1: p.x, y1: p.y, x2: q.x, y2: q.y, class: 'flow-line' }, svg); });
    // center spokes (animated pulse) + outer leaf branches (animated pulse)
    P.forEach((p, i) => {
      E('line', { x1: cx, y1: cy, x2: p.x, y2: p.y, class: 'flow-line' }, svg);
      const pl = E('line', { x1: cx, y1: cy, x2: p.x, y2: p.y, class: 'flow-pulse' }, svg);
      pl.style.animationDelay = (i * 0.4).toFixed(2) + 's';
      E('line', { x1: p.x, y1: p.y, x2: p.lx, y2: p.ly, class: 'flow-line' }, svg);
      const lp = E('line', { x1: p.x, y1: p.y, x2: p.lx, y2: p.ly, class: 'flow-pulse' }, svg);
      lp.style.animationDelay = (1.2 + i * 0.4).toFixed(2) + 's';
      E('circle', { cx: p.lx, cy: p.ly, r: 4.5, fill: '#0d1740', stroke: 'rgba(140,168,255,.72)', 'stroke-width': 1.2 }, svg);
      E('circle', { cx: p.lx, cy: p.ly, r: 1.7, fill: 'rgba(0,240,255,.85)' }, svg);
    });
    // primary nodes on top
    P.forEach(p => {
      const node = E('g', { class: 'flow-node' }, svg);
      E('circle', { cx: p.x, cy: p.y, r: 15 }, node);
      E('circle', { cx: p.x, cy: p.y, r: 3.4, fill: 'rgba(0,240,255,.95)' }, node);
      E('text', { x: p.x, y: p.y + 26 }, node).textContent = p.label;
    });
    E('circle', { cx: cx, cy: cy, r: 27, class: 'flow-core' }, svg);
    E('circle', { cx: cx, cy: cy, r: 8, fill: '#eaf3ff' }, svg);
    el.appendChild(svg);
  }

  /* ---------- CRM: pipeline (dense, woven, animated, iconified) ---------- */
  function initCrm(el) {
    const svg = E('svg', { viewBox: '0 0 300 300', preserveAspectRatio: 'xMidYMid meet' });
    const defs = E('defs', null, svg);
    const wg = E('radialGradient', { id: 'crmwin' }, defs);
    E('stop', { offset: '0', 'stop-color': '#bfe9ff' }, wg);
    E('stop', { offset: '1', 'stop-color': '#0a1e63' }, wg);

    const cols = [46, 100, 154, 208, 258];
    const stats = [['New Leads', '32,340'], ['Qualified', '17,410'], ['Engaged', '9,240'], ['Proposal', '5,120'], ['Won', '1,270']];
    stats.forEach(([l, n], i) => {
      const g = E('g', { class: 'crm-stat' }, svg);
      E('text', { x: cols[i], y: 62, 'text-anchor': 'middle', class: 'n' }, g).textContent = n;
      E('text', { x: cols[i], y: 76, 'text-anchor': 'middle', class: 'l' }, g).textContent = l;
    });
    E('line', { x1: 26, y1: 90, x2: 274, y2: 90, stroke: 'rgba(110,146,255,.18)', 'stroke-width': 1 }, svg);

    // nodes: 4-3-3-2-1 funnel, vertically distributed
    const counts = [4, 3, 3, 2, 1], top = 118, bot = 262, mid = (top + bot) / 2;
    const nodes = [];
    cols.forEach((x, ci) => {
      const c = counts[ci], gap = c > 1 ? (bot - top) / (c - 1) : 0;
      for (let r = 0; r < c; r++) nodes.push({ x, y: c === 1 ? mid : top + gap * r, ci });
    });

    // links: fully connect adjacent columns (tangled), + sparse skip-links across a gap
    const links = [];
    for (let ci = 0; ci < cols.length - 1; ci++) {
      const from = nodes.filter(n => n.ci === ci), to = nodes.filter(n => n.ci === ci + 1);
      from.forEach(f => to.forEach(t => links.push({ a: f, b: t })));
    }
    for (let ci = 0; ci < cols.length - 2; ci++) {
      const from = nodes.filter(n => n.ci === ci), to = nodes.filter(n => n.ci === ci + 2);
      from.forEach((f, k) => { if (k % 2 === 0) links.push({ a: f, b: to[k % to.length], skip: true }); });
    }

    const paths = links.map(({ a, b }) => {
      const mxp = a.x + (b.x - a.x) * 0.5, bow = (b.y - a.y) * 0.18; // organic arc
      return `M${a.x},${a.y} C${mxp},${a.y + bow} ${mxp},${b.y - bow} ${b.x},${b.y}`;
    });
    paths.forEach((d, i) => E('path', { d, class: 'crm-link' + (links[i].skip ? ' skip' : (i % 3 === 0 ? ' hot' : '')) }, svg));

    // flowing data dots — most links carry one, staggered speeds/starts
    if (!reduce) paths.forEach((d, i) => {
      if (links[i].skip || i % 5 === 4) return;
      const dot = E('circle', { r: (1.7 + (i % 3) * 0.5).toFixed(1), class: 'crm-dot' }, svg);
      E('animateMotion', { dur: (1.9 + (i % 7) * 0.35).toFixed(2) + 's', repeatCount: 'indefinite', path: d, begin: ((i % 9) * 0.28).toFixed(2) + 's' }, dot);
    });

    // person-icon nodes (Won = larger, gradient, glow-pulse)
    nodes.forEach((n, i) => {
      const win = n.ci === cols.length - 1, sc = win ? 1.55 : 1, R = win ? 13 : 9;
      const gr = E('g', { class: 'crm-node' + (win ? ' win' : '') }, svg);
      const halo = E('circle', { cx: n.x, cy: n.y, r: R, class: 'crm-halo' }, gr);
      if (!reduce) halo.style.animationDelay = (i * 0.22).toFixed(2) + 's';
      E('circle', { cx: n.x, cy: n.y - 2.6 * sc, r: 2.4 * sc, class: 'crm-head' }, gr);
      E('path', { d: `M${n.x - 4 * sc},${n.y + 5 * sc} a${4 * sc},${4 * sc} 0 0 1 ${8 * sc},0`, class: 'crm-body' }, gr);
    });
    el.appendChild(svg);
  }

  const io = new IntersectionObserver((ents) => {
    ents.forEach(en => {
      const el = en.target, type = el.dataset.viz;
      if (en.isIntersecting) {
        if (!el._init) {
          el._init = true;
          if (type === 'flow') initFlow(el);
          else if (type === 'crm') initCrm(el);
          else if (type === 'brain') { const c = initBrain(el); el._ctrl = c; reduce ? c.once() : c.start(); }
        } else if (type === 'brain' && el._ctrl && !reduce) el._ctrl.start();
      } else if (type === 'brain' && el._ctrl) el._ctrl.stop();
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.viz').forEach(v => io.observe(v));
})();
