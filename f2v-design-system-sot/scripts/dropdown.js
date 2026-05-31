/* =========================================================
   FARM2VET DESIGN SYSTEM — DROPDOWN CONTROLLER
   Implements the ARIA listbox pattern for every [data-dropdown]:
   - Click trigger to open; click outside / Escape / Tab to close
   - ArrowUp / ArrowDown to move focus inside the menu
   - Enter / Space to select the focused option
   - Hover / focus highlights the option with primary tint
   - Selected option gets a checkmark and stays highlighted
   Self-initialises on DOMContentLoaded. Idempotent per dropdown:
   each instance is tagged with data-dropdown-bound after wiring so
   a second call (or a stray re-init) is a no-op.
   ========================================================= */
(function () {
  function initOne(dropdown) {
    if (dropdown.dataset.dropdownBound === 'true') return;
    dropdown.dataset.dropdownBound = 'true';

    const trigger  = dropdown.querySelector('.dropdown__trigger');
    const menu     = dropdown.querySelector('.dropdown__menu');
    const valueEl  = dropdown.querySelector('.dropdown__value');
    const options  = Array.from(dropdown.querySelectorAll('.dropdown__option'));
    let focusIdx = -1;

    function open() {
      document.querySelectorAll('.dropdown.is-open').forEach(d => {
        if (d !== dropdown) d.classList.remove('is-open');
      });
      dropdown.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      const selected = dropdown.querySelector('.dropdown__option.is-selected');
      focusIdx = selected ? options.indexOf(selected) : 0;
      updateFocus();
    }
    function close() {
      dropdown.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      focusIdx = -1;
      options.forEach(o => o.classList.remove('is-focus'));
    }
    function toggle() {
      dropdown.classList.contains('is-open') ? close() : open();
    }
    function select(option) {
      options.forEach(o => o.classList.remove('is-selected'));
      option.classList.add('is-selected');
      const labelNode = option.querySelector('span') || option;
      const labelText = (labelNode.firstChild && labelNode.firstChild.nodeType === 3)
        ? labelNode.firstChild.textContent.trim()
        : option.textContent.trim();
      valueEl.textContent = labelText;
      trigger.classList.remove('is-empty');
      dropdown.dispatchEvent(new CustomEvent('dropdown:change', {
        detail: { value: option.dataset.value, label: labelText }
      }));
      close();
      trigger.focus();
    }
    function updateFocus() {
      options.forEach((o, i) => {
        o.classList.toggle('is-focus', i === focusIdx);
        if (i === focusIdx) o.scrollIntoView({ block: 'nearest' });
      });
    }

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (!dropdown.classList.contains('is-open')) open();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!dropdown.classList.contains('is-open')) {
          open();
          focusIdx = options.length - 1;
          updateFocus();
        }
      }
    });

    options.forEach((option, i) => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        select(option);
      });
      option.addEventListener('mouseenter', () => {
        focusIdx = i;
        updateFocus();
      });
    });

    dropdown.addEventListener('keydown', (e) => {
      if (!dropdown.classList.contains('is-open')) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        trigger.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusIdx = (focusIdx + 1) % options.length;
        updateFocus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        focusIdx = focusIdx <= 0 ? options.length - 1 : focusIdx - 1;
        updateFocus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (focusIdx >= 0) select(options[focusIdx]);
      } else if (e.key === 'Tab') {
        close();
      }
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) close();
    });
  }

  function initAll() {
    document.querySelectorAll('[data-dropdown]').forEach(initOne);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Expose so a page can re-init after dynamically inserting dropdowns.
  window.F2V = window.F2V || {};
  window.F2V.initDropdowns = initAll;
})();
