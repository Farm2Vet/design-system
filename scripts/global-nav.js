/* =========================================================
   FARM2VET DESIGN SYSTEM — GLOBAL NAV
   Drives the shared header chrome rendered by every
   design-system page. Three responsibilities:

     1. Mark the current page. Each page declares its
        own filename via `<body data-page="…">`. The
        script finds the matching link in the panel and
        adds `.is-current`; the parent Section trigger
        is also marked so the bar reflects the active
        Section even when the panel is collapsed.

     2. Toggle panels for keyboard / touch users.
        Hovering the trigger expands the panel via CSS.
        Clicking the trigger toggles `.is-open` so the
        panel is reachable without a pointer.

     3. Dismiss panels on outside-click and Escape.

   Self-initialising IIFE; no per-page wiring required.
   ========================================================= */

(function () {
    'use strict';

    function init() {
        var nav = document.querySelector('.global-nav');
        if (!nav) return;

        var triggers = Array.prototype.slice.call(
            nav.querySelectorAll('.global-nav__trigger')
        );
        var hasPanelItems = Array.prototype.slice.call(
            nav.querySelectorAll('.global-nav__item--has-panel')
        );

        /* ---------- 1. Current-page highlighting ---------- */
        var currentPage = (document.body.getAttribute('data-page') || '').trim();
        if (currentPage) {
            var allLinks = Array.prototype.slice.call(
                nav.querySelectorAll('a[href]')
            );
            allLinks.forEach(function (link) {
                var href = (link.getAttribute('href') || '').trim();
                /* Match either bare filename or .html-suffixed
                   form, so pages don't have to be careful about
                   which they declare. */
                if (
                    href === currentPage ||
                    href === currentPage + '.html' ||
                    href.replace(/\.html$/, '') === currentPage.replace(/\.html$/, '')
                ) {
                    link.classList.add('is-current');
                    /* Also mark the parent Section trigger so the
                       tier-1 bar reflects the active Section even
                       when the panel is collapsed. */
                    var item = link.closest('.global-nav__item--has-panel');
                    if (item) {
                        var trig = item.querySelector('.global-nav__trigger');
                        if (trig) trig.classList.add('is-current');
                    }
                }
            });
        }

        /* ---------- 2. Click-to-toggle ---------- */
        triggers.forEach(function (trigger) {
            trigger.addEventListener('click', function (event) {
                event.preventDefault();
                var item = trigger.closest('.global-nav__item--has-panel');
                if (!item) return;
                var willOpen = !item.classList.contains('is-open');
                closeAll();
                if (willOpen) {
                    item.classList.add('is-open');
                    trigger.setAttribute('aria-expanded', 'true');
                }
            });
        });

        /* ---------- 3. Dismiss ---------- */
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' || event.key === 'Esc') {
                closeAll();
            }
        });
        document.addEventListener('click', function (event) {
            if (!nav.contains(event.target)) closeAll();
        });

        function closeAll() {
            hasPanelItems.forEach(function (item) {
                item.classList.remove('is-open');
                var trig = item.querySelector('.global-nav__trigger');
                if (trig) trig.setAttribute('aria-expanded', 'false');
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
