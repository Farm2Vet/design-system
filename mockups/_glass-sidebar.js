/* ============================================================
   GLASS SIDEBAR controller — shared behaviour for all wireframe
   mockups. Ported verbatim from
   workspace/dashboard-forest-glass-sidebar.html (SoT III-12):
   collapse/expand, disclosure sub-lists, profile overflow menu,
   click-outside / Escape dismiss, and active-link state.
   Self-initialising; safe to load with `defer` on any page that
   contains a `.sidebar` glass rail.
   ============================================================ */
(function () {
  function boot() {
    // Sidebar controller — collapse, disclosure, profile menu
    function initRail(rail) {
      if (rail.dataset.sidebarBound === 'true') return;
      rail.dataset.sidebarBound = 'true';

      // Collapse / expand
      rail.querySelectorAll('.sidebar__collapse').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var next = !rail.classList.contains('sidebar--collapsed');
          rail.classList.toggle('sidebar--collapsed', next);
          btn.setAttribute('aria-pressed', String(next));
          btn.setAttribute('aria-label', next ? 'Expand sidebar' : 'Collapse sidebar');
        });
      });

      // Disclosure sub-list toggle
      rail.querySelectorAll('.sidebar__link[aria-expanded]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var item = btn.closest('.sidebar__item');
          if (!item) return;
          var next = !item.classList.contains('is-open');
          item.classList.toggle('is-open', next);
          btn.setAttribute('aria-expanded', String(next));
        });
      });

      // Profile overflow menu
      rail.querySelectorAll('.sidebar__profile-wrap').forEach(function (wrap) {
        var trigger = wrap.querySelector('.sidebar__overflow, button.sidebar__profile');
        if (!trigger) return;
        trigger.addEventListener('click', function (e) {
          e.stopPropagation();
          var next = !wrap.classList.contains('is-open');
          document.querySelectorAll('.sidebar__profile-wrap').forEach(function (w) {
            w.classList.remove('is-open');
            var t = w.querySelector('.sidebar__overflow, button.sidebar__profile');
            if (t) t.setAttribute('aria-expanded', 'false');
          });
          wrap.classList.toggle('is-open', next);
          trigger.setAttribute('aria-expanded', String(next));
        });
      });
    }

    document.querySelectorAll('.sidebar').forEach(initRail);

    // Document-level dismiss (click-outside / Escape)
    function dismissMenus() {
      document.querySelectorAll('.sidebar__profile-wrap.is-open').forEach(function (w) {
        w.classList.remove('is-open');
        var t = w.querySelector('.sidebar__overflow, button.sidebar__profile');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
    document.addEventListener('click', dismissMenus);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') dismissMenus(); });

    // Active state for any real destination link (not the disclosure parent)
    document.querySelectorAll('.sidebar__link:not([aria-expanded])').forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelectorAll('.sidebar__link').forEach(function (i) { i.classList.remove('is-current'); });
        item.classList.add('is-current');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
