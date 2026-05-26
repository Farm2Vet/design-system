/* =========================================================
   SEGMENTED-SWITCH BOOT — shared across pages.
   Injects a sliding .switch__indicator into every
   .switch--segmented group and wires click handlers so the
   indicator glides between options instead of the active
   background snapping. Reposition on resize and after fonts
   load so layout shifts don't desync the indicator.
   Promoted from III-11-switch.html on first second consumer
   (V-04-disease-input.html).
   ========================================================= */
(function () {
  function initSegmentedSwitches(root) {
    var scope = root || document;
    scope.querySelectorAll('.switch--segmented').forEach(function (group) {
      if (group.dataset.switchInit === 'true') return;
      var opts = Array.prototype.slice.call(group.querySelectorAll('.switch__option'));
      if (opts.length === 0) return;
      group.dataset.switchInit = 'true';

      var indicator = group.querySelector(':scope > .switch__indicator');
      if (!indicator) {
        indicator = document.createElement('span');
        indicator.className = 'switch__indicator is-initial';
        indicator.setAttribute('aria-hidden', 'true');
        group.prepend(indicator);
      }

      function activeOpt() {
        return opts.find(function (o) {
          return o.classList.contains('is-on')
              || o.getAttribute('aria-pressed') === 'true'
              || o.getAttribute('aria-selected') === 'true';
        }) || opts[0];
      }

      function positionIndicator(animate) {
        var target = activeOpt();
        if (!target) return;
        if (!animate) indicator.classList.add('is-initial');
        var groupRect  = group.getBoundingClientRect();
        var targetRect = target.getBoundingClientRect();
        var borderLeft = parseFloat(getComputedStyle(group).borderLeftWidth) || 0;
        var x = targetRect.left - groupRect.left - borderLeft;
        indicator.style.width = targetRect.width + 'px';
        indicator.style.transform = 'translateX(' + x + 'px)';
        if (!animate) {
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { indicator.classList.remove('is-initial'); });
          });
        }
      }

      positionIndicator(false);

      window.addEventListener('resize', function () { positionIndicator(false); });
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () { positionIndicator(false); });
      }

      opts.forEach(function (opt) {
        opt.addEventListener('click', function () {
          if (opt.hasAttribute('disabled')) return;
          if (opt.classList.contains('is-on')) return;
          opts.forEach(function (o) {
            o.classList.remove('is-on');
            o.setAttribute('aria-pressed', 'false');
          });
          opt.classList.add('is-on');
          opt.setAttribute('aria-pressed', 'true');
          positionIndicator(true);
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initSegmentedSwitches(); });
  } else {
    initSegmentedSwitches();
  }

  window.initSegmentedSwitches = initSegmentedSwitches;
})();
