/* ============================================================================
   TRIVOX DESIGN SYSTEM — scroll.js
   Shared interactive scroll reveals (GSAP ScrollTrigger). Gives every page the
   same "V2" motion as the home: heads rise, feature image + text slide in from
   opposite sides, ledger rows cascade, counters count up.

   IMPORTANT: reveals animate TRANSFORM ONLY (no opacity). Opacity fade stays with
   motion.js [data-reveal], so nothing can ever get stuck invisible if a
   ScrollTrigger misfires — worst case an element just doesn't slide.

   Requires gsap + ScrollTrigger loaded before this file. Respects reduced-motion.
   ============================================================================ */
(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;

  // section heads rise + stagger
  gsap.utils.toArray('.band .head').forEach(function (el) {
    gsap.from(el.children, { y: 44, duration: .9, ease: 'power3.out', stagger: .08,
      scrollTrigger: { trigger: el, start: 'top 82%' } });
  });

  // feature rows: image and text arrive from opposite sides
  gsap.utils.toArray('.feature').forEach(function (f) {
    var img = f.querySelector('.fimg');
    var txt = Array.prototype.filter.call(f.children, function (c) { return c !== img; })[0];
    if (img) gsap.from(img, { xPercent: -12, duration: 1.05, ease: 'power3.out',
      scrollTrigger: { trigger: f, start: 'top 78%' } });
    if (txt) gsap.from(txt, { xPercent: 12, duration: 1.05, ease: 'power3.out',
      scrollTrigger: { trigger: f, start: 'top 78%' } });
  });

  // ledger rows cascade in
  gsap.utils.toArray('.ledger').forEach(function (l) {
    gsap.from(l.querySelectorAll('.row'), { y: 24, duration: .55, stagger: .06, ease: 'power2.out',
      scrollTrigger: { trigger: l, start: 'top 84%' } });
  });

  // products alternate sides (if any)
  gsap.utils.toArray('.product').forEach(function (p, i) {
    gsap.from(p, { xPercent: i % 2 ? 10 : -10, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: p, start: 'top 85%' } });
  });

  // count-up on enter (if any)
  gsap.utils.toArray('[data-count]').forEach(function (el) {
    var to = +el.dataset.count, o = { v: 0 };
    ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: function () {
      gsap.to(o, { v: to, duration: 1.4, ease: 'power2.out',
        onUpdate: function () { el.textContent = Math.round(o.v).toLocaleString(); } });
    } });
  });

  // recalc after images/fonts load (fixes stuck triggers on layout shift)
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  setTimeout(function () { ScrollTrigger.refresh(); }, 700);
})();
