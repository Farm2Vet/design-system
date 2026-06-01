/* ==========================================================================
   Disease Management mockups — shared interaction layer (vanilla, no build).
   Progressive: every behaviour is opt-in via data-attributes and no-ops if
   the relevant elements are absent on a page. Pure presentation/demo logic —
   no network, no persistence.
   ========================================================================== */
(function () {
  'use strict';

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ───────────────────────── Toast ───────────────────────── */
  function toast(message, opts) {
    opts = opts || {};
    var wrap = $('.wf-toast-wrap');
    if (!wrap) { wrap = document.createElement('div'); wrap.className = 'wf-toast-wrap'; document.body.appendChild(wrap); }
    var el = document.createElement('div');
    el.className = 'wf-toast';
    el.innerHTML = '<span class="wf-toast__dot"></span><span>' + message + '</span>';
    wrap.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('is-on'); });
    setTimeout(function () {
      el.classList.remove('is-on');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 220);
    }, opts.duration || 2600);
  }
  window.wfToast = toast;

  /* ───────────────────────── Dropdown menus ───────────────────────── */
  function closeMenus(except) {
    $$('.wf-menu.is-open').forEach(function (m) { if (m !== except) m.classList.remove('is-open'); });
  }
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('[data-menu-toggle]');
    if (toggle) {
      var menu = toggle.closest('.wf-menu');
      var willOpen = !menu.classList.contains('is-open');
      closeMenus(menu);
      menu.classList.toggle('is-open', willOpen);
      e.stopPropagation();
      return;
    }
    if (!e.target.closest('.wf-menu__panel')) closeMenus();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMenus(); closeModals(); } });

  /* ───────────────────────── Modals ───────────────────────── */
  function openModal(id) {
    var m = document.getElementById(id);
    if (!m) return;
    m.classList.add('is-open');
    var f = m.querySelector('[data-autofocus]');
    if (f) setTimeout(function () { f.focus(); }, 30);
  }
  function closeModals() { $$('.wf-modal.is-open').forEach(function (m) { m.classList.remove('is-open'); }); }
  window.wfOpenModal = openModal;
  window.wfCloseModals = closeModals;

  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-modal-open]');
    if (opener) { e.preventDefault(); closeMenus(); openModal(opener.getAttribute('data-modal-open')); return; }
    if (e.target.closest('[data-modal-close]') || e.target.classList.contains('wf-modal__scrim')) { closeModals(); }
  });

  /* ───────────────────────── Tab groups ─────────────────────────
     Markup:  [data-tabs-group="x"]  contains  .wf-tab[data-tab="key"]
              and (anywhere) .wf-tabpanel[data-tabpanel="key" data-tabs-group="x"] */
  document.addEventListener('click', function (e) {
    var tab = e.target.closest('.wf-tab[data-tab]');
    if (!tab) return;
    var groupName = tab.closest('[data-tabs-group]');
    groupName = groupName ? groupName.getAttribute('data-tabs-group') : null;
    var key = tab.getAttribute('data-tab');
    // activate sibling tabs within the same strip
    var strip = tab.closest('.wf-tabs');
    if (strip) $$('.wf-tab', strip).forEach(function (t) { t.classList.toggle('is-on', t === tab); });
    // activate matching panels in the same group
    $$('.wf-tabpanel[data-tabpanel]').forEach(function (p) {
      if (!groupName || p.getAttribute('data-tabs-group') === groupName) {
        p.classList.toggle('is-on', p.getAttribute('data-tabpanel') === key);
      }
    });
  });

  /* ───────────────────────── Language switch (record-wide) ─────────────────────────
     [data-lang-switch] with .wf-seg__opt[data-lang="en"|"vi"]; content marked
     [data-locale="en"|"vi"] toggles within an optional [data-lang-scope]. */
  function applyLocale(scope, locale) {
    $$('[data-locale]', scope).forEach(function (el) {
      el.classList.toggle('wf-hidden', el.getAttribute('data-locale') !== locale);
    });
  }
  $$('[data-lang-switch]').forEach(function (sw) {
    var scope = sw.getAttribute('data-lang-scope') ? $(sw.getAttribute('data-lang-scope')) : document;
    $$('.wf-seg__opt', sw).forEach(function (opt) {
      opt.addEventListener('click', function () {
        $$('.wf-seg__opt', sw).forEach(function (o) { o.classList.toggle('is-on', o === opt); });
        applyLocale(scope, opt.getAttribute('data-lang'));
      });
    });
  });

  /* ───────────────────────── Generic segmented panes (write/preview, density) ─────────────────────────
     [data-seg-group] containing .wf-seg__opt[data-seg="key"]; panes [data-pane="key"] toggle within
     the nearest [data-seg-scope] (defaults to the group's parent). */
  $$('[data-seg-group]').forEach(function (group) {
    var scope = group.getAttribute('data-seg-scope-sel') ? $(group.getAttribute('data-seg-scope-sel'))
              : (group.closest('[data-seg-scope]') || group.parentNode);
    $$('.wf-seg__opt', group).forEach(function (opt) {
      opt.addEventListener('click', function () {
        $$('.wf-seg__opt', group).forEach(function (o) { o.classList.toggle('is-on', o === opt); });
        var key = opt.getAttribute('data-seg');
        $$('[data-pane]', scope).forEach(function (p) { p.classList.toggle('wf-hidden', p.getAttribute('data-pane') !== key); });
        if (group.hasAttribute('data-density-target')) {
          var t = $(group.getAttribute('data-density-target'));
          if (t) t.classList.toggle('is-compact', key === 'compact');
        }
      });
    });
  });

  /* ───────────────────────── Status switch (activate / deactivate) ─────────────────────────
     .wf-switch[data-switch] toggles is-on; data-label-on / data-label-off update text;
     data-confirm="modalId" routes the *off→on or on→off* through a confirm modal first;
     data-toast-* supplies feedback copy. */
  function flipSwitch(sw) {
    var on = sw.classList.toggle('is-on');
    var label = $('.wf-switch__label', sw);
    if (label) label.textContent = on ? (sw.getAttribute('data-label-on') || 'Active')
                                       : (sw.getAttribute('data-label-off') || 'Inactive');
    var msg = on ? sw.getAttribute('data-toast-on') : sw.getAttribute('data-toast-off');
    if (msg) toast(msg);
    return on;
  }
  $$('.wf-switch[data-switch]').forEach(function (sw) {
    sw.setAttribute('tabindex', '0');
    sw.addEventListener('click', function (e) {
      e.stopPropagation();
      var confirmId = sw.getAttribute('data-confirm');
      // confirm only required when turning a live record OFF
      if (confirmId && sw.classList.contains('is-on')) {
        var modal = document.getElementById(confirmId);
        if (modal) { modal.__pendingSwitch = sw; openModal(confirmId); return; }
      }
      flipSwitch(sw);
    });
    sw.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); sw.click(); } });
  });
  // confirm-modal "proceed" button flips the pending switch
  $$('[data-confirm-proceed]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var modal = btn.closest('.wf-modal');
      if (modal && modal.__pendingSwitch) { flipSwitch(modal.__pendingSwitch); modal.__pendingSwitch = null; }
      closeModals();
    });
  });

  /* ───────────────────────── Sortable headers (3-state visual) ───────────────────────── */
  $$('.wf-th-sort').forEach(function (th) {
    var arrow = $('.wf-th-sort__arrow', th) || (function () {
      var a = document.createElement('span'); a.className = 'wf-th-sort__arrow'; th.appendChild(a); return a;
    })();
    th.addEventListener('click', function () {
      var wasActive = th.classList.contains('is-active');
      var dir = th.getAttribute('data-dir') || 'none';
      var next = !wasActive ? 'desc' : (dir === 'desc' ? 'asc' : (dir === 'asc' ? 'none' : 'desc'));
      // reset siblings
      var table = th.closest('table');
      if (table) $$('.wf-th-sort', table).forEach(function (o) { if (o !== th) { o.classList.remove('is-active'); o.setAttribute('data-dir', 'none'); var oa = $('.wf-th-sort__arrow', o); if (oa) oa.textContent = ''; } });
      th.setAttribute('data-dir', next);
      th.classList.toggle('is-active', next !== 'none');
      arrow.textContent = next === 'asc' ? '▲' : (next === 'desc' ? '▼' : '');
      var label = th.getAttribute('data-sort') || 'column';
      if (next !== 'none') toast('Sorted by ' + label + ' (' + (next === 'asc' ? 'ascending' : 'descending') + ')');
    });
  });

  /* ───────────────────────── Pagination ───────────────────────── */
  $$('[data-pager]').forEach(function (pager) {
    $$('.wf-pager__btn[data-page]', pager).forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.hasAttribute('disabled')) return;
        $$('.wf-pager__btn[data-page]', pager).forEach(function (b) { b.classList.remove('is-current'); });
        btn.classList.add('is-current');
      });
    });
    var jump = $('.wf-pager__jump input', pager);
    if (jump) jump.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { toast('Jumped to page ' + (jump.value || '1')); }
    });
  });

  /* ───────────────────────── Row selection + bulk bar ───────────────────────── */
  (function () {
    var table = $('[data-selectable]');
    if (!table) return;
    var bulk = $('[data-bulkbar]');
    var rowChecks = $$('.wf-check[data-row-check]', table);
    var allCheck = $('.wf-check[data-check-all]', table);
    function refresh() {
      var n = rowChecks.filter(function (c) { return c.classList.contains('is-on'); }).length;
      if (bulk) {
        bulk.classList.toggle('is-on', n > 0);
        var c = $('.wf-bulkbar__count', bulk); if (c) c.textContent = n + (n === 1 ? ' disease' : ' diseases') + ' selected';
      }
      if (allCheck) allCheck.classList.toggle('is-on', n > 0 && n === rowChecks.length);
    }
    rowChecks.forEach(function (c) {
      c.addEventListener('click', function (e) { e.stopPropagation(); c.classList.toggle('is-on'); refresh(); });
    });
    if (allCheck) allCheck.addEventListener('click', function (e) {
      e.stopPropagation();
      var turnOn = !allCheck.classList.contains('is-on');
      rowChecks.forEach(function (c) { c.classList.toggle('is-on', turnOn); });
      refresh();
    });
    var clear = $('[data-bulk-clear]');
    if (clear) clear.addEventListener('click', function () { rowChecks.forEach(function (c) { c.classList.remove('is-on'); }); refresh(); });
  })();

  /* ───────────────────────── Faceted filters ─────────────────────────
     Facet menu: .wf-menu containing .wf-menu__item[data-facet-opt]; trigger has
     [data-facet] + a [data-facet-count] badge. Selected options accumulate into
     the [data-filter-summary] strip as removable chips. */
  (function () {
    var summary = $('[data-filter-summary]');
    function rebuildSummary() {
      if (!summary) return;
      var chips = $$('.wf-menu__item.is-selected[data-facet-opt]');
      var holder = $('[data-filter-chips]', summary) || summary;
      // keep label node, remove old chips
      $$('[data-summary-chip]', holder).forEach(function (c) { c.remove(); });
      var clearBtn = $('[data-filter-clear]');
      chips.forEach(function (opt) {
        var chip = document.createElement('span');
        chip.className = 'wf-chip wf-chip--strong';
        chip.setAttribute('data-summary-chip', opt.getAttribute('data-facet-opt'));
        chip.innerHTML = (opt.getAttribute('data-facet-label') || opt.textContent.trim()) + ' <span class="wf-chip__x">×</span>';
        chip.querySelector('.wf-chip__x').addEventListener('click', function () {
          opt.classList.remove('is-selected'); syncCounts(); rebuildSummary();
        });
        holder.insertBefore(chip, clearBtn || null);
      });
      summary.classList.toggle('wf-hidden', chips.length === 0);
    }
    function syncCounts() {
      $$('.wf-menu[data-facet-menu]').forEach(function (menu) {
        var n = $$('.wf-menu__item.is-selected[data-facet-opt]', menu).length;
        var trigger = menu.querySelector('[data-facet]');
        if (!trigger) return;
        var badge = $('[data-facet-count]', trigger);
        if (badge) { badge.textContent = n; badge.classList.toggle('wf-hidden', n === 0); }
        trigger.classList.toggle('is-active', n > 0);
      });
    }
    $$('.wf-menu__item[data-facet-opt]').forEach(function (opt) {
      opt.addEventListener('click', function (e) {
        e.stopPropagation();
        opt.classList.toggle('is-selected');
        var chk = $('.wf-menu__check', opt); // visual handled by is-selected
        syncCounts(); rebuildSummary();
      });
    });
    var clear = $('[data-filter-clear]');
    if (clear) clear.addEventListener('click', function () {
      $$('.wf-menu__item.is-selected[data-facet-opt]').forEach(function (o) { o.classList.remove('is-selected'); });
      syncCounts(); rebuildSummary();
    });
    syncCounts(); rebuildSummary();
  })();

  /* ───────────────────────── Type-to-confirm (destructive) ─────────────────────────
     [data-confirm-type] input; matches [data-confirm-word]; enables [data-confirm-gate]. */
  $$('[data-confirm-type]').forEach(function (input) {
    var modal = input.closest('.wf-modal') || document;
    var gate = $('[data-confirm-gate]', modal);
    var word = input.getAttribute('data-confirm-word') || '';
    input.addEventListener('input', function () {
      var ok = input.value.trim() === word;
      if (gate) { gate.toggleAttribute('disabled', !ok); gate.classList.toggle('is-disabled', !ok); }
    });
  });

  /* ───────────────────────── Chip-picker (toggle chips) ───────────────────────── */
  document.addEventListener('click', function (e) {
    var tog = e.target.closest('.wf-tog[data-tog]');
    if (tog) { tog.classList.toggle('is-on'); }
  });

  /* ───────────────────────── Inline collapse (clinical form groups) ─────────────────────────
     [data-collapse-toggle] toggles .is-collapsed on the closest [data-collapsible]. */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-collapse-toggle]');
    if (!t) return;
    var box = t.closest('[data-collapsible]');
    if (box) box.classList.toggle('is-collapsed');
  });

  /* ───────────────────────── Generic demo actions ─────────────────────────
     Any element with [data-toast] fires a toast on click (Save, Sync, etc.). */
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-toast]');
    if (t) { toast(t.getAttribute('data-toast')); }
  });

  /* Dirty-state: any input change in a [data-form] flips the save bar to dirty. */
  $$('[data-form]').forEach(function (form) {
    form.addEventListener('input', function () {
      $$('[data-save-state]').forEach(function (s) {
        s.setAttribute('data-state', 'dirty');
        var dot = $('.wf-savebar__dot', s) || $('.wf-savebar__dot');
        var txt = $('[data-save-text]', s);
        if (txt) txt.textContent = 'Unsaved changes';
      });
      $$('.wf-savebar__dot').forEach(function (d) { d.classList.add('is-dirty'); d.classList.remove('is-saved'); });
      $$('[data-save-text]').forEach(function (txt) { txt.textContent = 'Unsaved changes'; });
      $$('[data-save-btn]').forEach(function (b) { b.removeAttribute('disabled'); b.classList.remove('is-disabled'); });
    }, true);
  });

  /* ───────────────────────── Whole-row navigation ─────────────────────────
     [data-row-href] navigates on click, but never when the click began on an
     interactive child (link, button, input, checkbox, switch, menu). */
  $$('[data-row-href]').forEach(function (row) {
    row.addEventListener('click', function (e) {
      if (e.target.closest('a, button, input, .wf-check, .wf-switch, .wf-menu')) return;
      location.href = row.getAttribute('data-row-href');
    });
  });

  /* ───────────────────────── Scrollspy TOC ─────────────────────────
     [data-toc] links with href="#sectionId"; sections are .wf-doc-section[id]. */
  $$('[data-toc]').forEach(function (toc) {
    var links = $$('a[href^="#"]', toc);
    if (!links.length) return;
    var map = {};
    links.forEach(function (l) { map[l.getAttribute('href').slice(1)] = l; });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (l) { l.classList.remove('is-active'); });
            if (map[en.target.id]) map[en.target.id].classList.add('is-active');
          }
        });
      }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });
      Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    }
    links.forEach(function (l) {
      l.addEventListener('click', function (e) {
        var id = l.getAttribute('href').slice(1);
        var sec = document.getElementById(id);
        if (sec) {
          e.preventDefault();
          sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          links.forEach(function (x) { x.classList.remove('is-active'); });
          l.classList.add('is-active');
        }
      });
    });
  });

})();
