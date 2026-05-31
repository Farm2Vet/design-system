/* =========================================================
   FARM2VET DESIGN SYSTEM — SIDEBAR CONTROLLER
   Wires the three runtime behaviours of every .sidebar:
     - Collapse / expand toggle via .sidebar__collapse
     - Disclosure sub-list toggle via .sidebar__link[aria-expanded]
     - Profile-overflow menu via .sidebar__profile-wrap
   Self-initialises on DOMContentLoaded. Idempotent per rail:
   each instance is tagged with data-sidebar-bound after wiring,
   so a second call (or a stray re-init) is a no-op. Promoted
   out of III-12-sidebar.html's inline <script> once V-01-wiki
   became the second consumer.
   ========================================================= */
(function () {

    function initRail(rail) {
        if (rail.dataset.sidebarBound === 'true') return;
        rail.dataset.sidebarBound = 'true';

        // ---- Collapse / expand --------------------------------------------
        rail.querySelectorAll('.sidebar__collapse').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var next = !rail.classList.contains('sidebar--collapsed');
                rail.classList.toggle('sidebar--collapsed', next);
                btn.setAttribute('aria-pressed', String(next));
                btn.setAttribute('aria-label', next ? 'Expand sidebar' : 'Collapse sidebar');
            });
        });

        // ---- Disclosure sub-list toggle -----------------------------------
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

        // ---- Profile overflow menu ----------------------------------------
        rail.querySelectorAll('.sidebar__profile-wrap').forEach(function (wrap) {
            var trigger = wrap.querySelector('.sidebar__overflow, button.sidebar__profile');
            if (!trigger) return;
            trigger.addEventListener('click', function (e) {
                e.stopPropagation();
                var next = !wrap.classList.contains('is-open');
                // Close every other open profile menu, document-wide, so
                // multi-rail demo pages (III-12) behave like the runtime
                // contract: at most one profile menu is open at a time.
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

    // Document-level dismiss (click-outside / Escape). Bound once.
    var dismissBound = false;
    function bindGlobalDismiss() {
        if (dismissBound) return;
        dismissBound = true;
        document.addEventListener('click', function () {
            document.querySelectorAll('.sidebar__profile-wrap.is-open').forEach(function (w) {
                w.classList.remove('is-open');
                var t = w.querySelector('.sidebar__overflow, button.sidebar__profile');
                if (t) t.setAttribute('aria-expanded', 'false');
            });
        });
        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            document.querySelectorAll('.sidebar__profile-wrap.is-open').forEach(function (w) {
                w.classList.remove('is-open');
                var t = w.querySelector('.sidebar__overflow, button.sidebar__profile');
                if (t) t.setAttribute('aria-expanded', 'false');
            });
        });
    }

    function initAll() {
        document.querySelectorAll('.sidebar').forEach(initRail);
        bindGlobalDismiss();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }

    // Expose so a page can re-init after dynamically inserting a rail.
    window.F2V = window.F2V || {};
    window.F2V.initSidebars = initAll;

})();
