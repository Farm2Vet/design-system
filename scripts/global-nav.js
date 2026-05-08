/* =========================================================
   FARM2VET DESIGN SYSTEM — GLOBAL NAV
   Drives the shared header chrome rendered by every
   design-system page. Four responsibilities:

     1. Mark the current page. Each page declares its
        own filename via `<body data-page="…">`. The
        script finds the matching link in the panel and
        adds `.is-current`; the parent Section trigger
        is also marked so the bar reflects the active
        Section even when the panel is collapsed.

     2. Open / close panels on pointer interaction.
        `mouseenter` on a trigger opens its panel and
        closes any other open panel — so hovering Assets
        while Components is open swaps the two cleanly.
        Once open, the panel persists while the pointer
        is anywhere within the bar (or its panel), and
        closes only when the pointer leaves the bar.

     3. Click-to-toggle for keyboard / touch users; the
        runtime keeps `aria-expanded` in sync.

     4. Dismiss panels on outside-click and Escape, and
        toggle a body-level "backdrop visible" flag so
        the rest of the page is dimmed/blurred behind
        any open panel.

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

        /* ---------- 2. Backdrop element ----------
           Injected once on init so pages do not need to
           author the markup. Position: fixed full-viewport.
           Visibility is toggled via .is-visible by the
           runtime alongside .is-open. */
        var backdrop = document.createElement('div');
        backdrop.className = 'global-nav__backdrop';
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.appendChild(backdrop);

        /* ---------- 3. Open / close primitives ---------- */
        function openPanel(item) {
            if (!item) return;
            /* Close any other panel first so only one is
               ever open at a time — this is what makes
               hover-into-Assets-while-Components-is-open
               cleanly swap rather than stack. */
            hasPanelItems.forEach(function (other) {
                if (other !== item) {
                    other.classList.remove('is-open');
                    var t = other.querySelector('.global-nav__trigger');
                    if (t) t.setAttribute('aria-expanded', 'false');
                }
            });
            item.classList.add('is-open');
            var trig = item.querySelector('.global-nav__trigger');
            if (trig) trig.setAttribute('aria-expanded', 'true');
            backdrop.classList.add('is-visible');
        }

        function closeAll() {
            hasPanelItems.forEach(function (item) {
                item.classList.remove('is-open');
                var trig = item.querySelector('.global-nav__trigger');
                if (trig) trig.setAttribute('aria-expanded', 'false');
            });
            backdrop.classList.remove('is-visible');
        }

        /* ---------- 4. Pointer behaviour ----------
           `mouseenter` on a panel-item opens its panel
           (and closes any other). The panel persists
           while the pointer is anywhere in the bar
           because we listen for `mouseleave` on the
           bar itself, not on the individual item — the
           panel is a DOM child of the bar, so moving
           between trigger, gap, and panel never leaves
           the .global-nav element. */
        hasPanelItems.forEach(function (item) {
            item.addEventListener('mouseenter', function () {
                openPanel(item);
            });
        });

        nav.addEventListener('mouseleave', function () {
            closeAll();
        });

        /* ---------- 5. Click-to-toggle ----------
           For keyboard / touch users (no hover). Click
           on an already-open trigger closes it; click
           on a closed trigger opens it (swapping out
           any other open panel via openPanel). */
        triggers.forEach(function (trigger) {
            trigger.addEventListener('click', function (event) {
                event.preventDefault();
                var item = trigger.closest('.global-nav__item--has-panel');
                if (!item) return;
                if (item.classList.contains('is-open')) {
                    closeAll();
                } else {
                    openPanel(item);
                }
                /* Drop the click-induced focus. Mouse-clicks leave
                   the button focused, and the CSS `:focus-within`
                   rule would then keep this panel visible even
                   after hover on a different trigger has removed
                   its `.is-open` — so both panels would render
                   at once. `event.detail === 0` means the click
                   came from keyboard activation (Enter / Space)
                   on a focused button; we leave focus alone in
                   that case so keyboard navigation isn't disrupted. */
                if (event.detail > 0) trigger.blur();
            });
        });

        /* ---------- 6. Dismiss ---------- */
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' || event.key === 'Esc') {
                closeAll();
            }
        });
        document.addEventListener('click', function (event) {
            if (!nav.contains(event.target)) closeAll();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
