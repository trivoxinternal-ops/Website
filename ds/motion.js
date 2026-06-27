/* ============================================================================
   TRIVOX DESIGN SYSTEM — motion.js
   Pairs with motion.css. Two behaviors, zero dependencies:
   1. [data-reveal]  -> reveals on scroll (IntersectionObserver)
   2. [data-tilt]    -> 3D tilt + cursor spotlight (sets --mx/--my/transform)
   Respects prefers-reduced-motion.
   ============================================================================ */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) Scroll reveals
  var reveals = document.querySelectorAll('[data-reveal]');
  if (reduce) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // 2) Pointer tilt + spotlight
  if (!reduce) {
    document.querySelectorAll('[data-tilt]').forEach(function (c) {
      var max = parseFloat(c.getAttribute('data-tilt')) || 8;
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.transform = 'rotateX(' + ((0.5 - y) * max).toFixed(2) + 'deg) rotateY(' +
          ((x - 0.5) * (max + 2)).toFixed(2) + 'deg) translateY(-4px)';
        c.style.setProperty('--mx', (x * 100) + '%');
        c.style.setProperty('--my', (y * 100) + '%');
      });
      c.addEventListener('pointerleave', function () { c.style.transform = ''; });
    });
  }
})();
