/* =========================================================
   FARM2VET DESIGN SYSTEM — SCROLL SPY
   Highlights the topbar TOC link whose target section is
   currently in view. Self-initializing IIFE — every design
   system page that loads this script gets the behaviour
   automatically; no per-page wiring required.

   Activation point (the y-coordinate that triggers a
   section to become active) is computed from the same CSS
   values the browser uses to land hash navigation:
     scroll-padding-top  (declared on <html>)
     scroll-margin-top   (declared on .chunk sections)
   plus a small buffer. This guarantees that clicking a TOC
   link AND the spy agree on what counts as "in view" —
   without it, a click would scroll the section to its CSS-
   defined landing position but the spy would still report
   the previous section as active.

   When no section has crossed the activation line yet (the
   user is in the page's hero), the spy defaults to the
   first section IF that section is at least partially
   visible. This avoids an empty-nav state right as the
   user begins reading.
   ========================================================= */

(function () {
  'use strict';

  function initScrollSpy() {
    var topbar = document.querySelector('.topbar');
    var tocLinks = Array.prototype.slice.call(
      document.querySelectorAll('.toc a[href^="#"]')
    );
    if (!tocLinks.length) return;

    var targets = tocLinks
      .map(function (link) {
        var id = link.getAttribute('href').slice(1);
        var section = document.getElementById(id);
        return section ? { link: link, section: section } : null;
      })
      .filter(Boolean);
    if (!targets.length) return;

    /* Activation offset = scroll-padding-top + scroll-margin-top + buffer.
       Computed once at init from CSS so the spy stays in sync if those
       tokens change. Recomputed on resize as a safety net (a layout
       shift could affect the topbar's height-driven scroll-padding). */
    function px(value) {
      var n = parseFloat(value);
      return isNaN(n) ? 0 : n;
    }
    function getActivationOffset() {
      var html = document.documentElement;
      var sp = px(getComputedStyle(html).scrollPaddingTop);
      var sm = px(getComputedStyle(targets[0].section).scrollMarginTop);
      /* Buffer: if neither CSS token is set, fall back to the topbar
         height (sticky element offset) plus 40px. */
      var fallback =
        topbar ? topbar.getBoundingClientRect().height + 40 : 120;
      var line = sp + sm + 30;
      return line < fallback ? fallback : line;
    }

    var activationOffset = getActivationOffset();
    var raf = null;

    function update() {
      raf = null;
      var active = null;
      for (var i = 0; i < targets.length; i++) {
        var top = targets[i].section.getBoundingClientRect().top;
        if (top - activationOffset <= 0) {
          active = targets[i];
        } else {
          break;
        }
      }

      /* Default to the first section when nothing has crossed the
         line yet, BUT only if that first section is at least
         partially visible. Avoids highlighting "01" while the user
         is still in the hero with all sections below the fold. */
      if (!active && targets.length) {
        var firstTop = targets[0].section.getBoundingClientRect().top;
        if (firstTop < window.innerHeight) {
          active = targets[0];
        }
      }

      for (var j = 0; j < targets.length; j++) {
        targets[j].link.classList.toggle('is-active', targets[j] === active);
      }
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(update);
    }

    function onResize() {
      activationOffset = getActivationOffset();
      onScroll();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    /* Click handler — mark the clicked link active immediately so
       the UI doesn't lag during the smooth-scroll animation. The
       spy then reconciles when scroll settles at the section. */
    tocLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        tocLinks.forEach(function (l) { l.classList.remove('is-active'); });
        link.classList.add('is-active');
      });
    });

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollSpy);
  } else {
    initScrollSpy();
  }
})();
