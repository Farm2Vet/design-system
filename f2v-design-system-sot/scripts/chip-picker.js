/* =========================================================
   FARM2VET DESIGN SYSTEM — CHIP PICKER (standalone)
   Multi-select tag input controller. Builds the three-row
   DOM (chips · search · dropdown menu) for every
   [data-chip-picker] from its data-vocab list, then wires
   open/close, tag toggling, chip removal, filtering, keyboard
   navigation, and the add-to-vocabulary affordance.

   Extracted from scripts/v04-disease.js so non-V-04 pages
   (e.g. the test-profile editor) can mount the chip-picker
   without pulling the full V-04 controller. The V-04 page
   keeps its own in-file copy with i18n wiring; this standalone
   variant prefers literal data-placeholder / data-addvocab
   attributes when present, falling back to the same tr()
   lookup as V-04 (which here resolves to the supplied English
   fallback because no t() catalog is in scope).
   ========================================================= */
(function () {
  var VOCAB = {
    "dermatological-symptoms": ["Alopecia", "Cyanosis", "Cyanotic foci", "Diamond-shaped lesions", "Erythema", "Intense hyperemia", "Necrosis", "Petechiae", "Pruritus", "Purple hemorrhagic marks", "Skin ulcers", "Vesicles"],
    "digestive-symptoms":      ["Anorexia", "Bloating", "Bloody feces", "Constipation", "Diarrhea", "Hematemesis", "Melena", "Nausea", "Reduced appetite", "Salivation", "Vomiting", "Watery feces"],
    "respiratory-symptoms":    ["Cough", "Cyanosis", "Dyspnea", "Hemorrhagic cough", "Nasal discharge", "Sneezing", "Tachypnea"],
    "neurological-symptoms":   ["Ataxia", "Convulsions", "Inactivity", "Lethargy", "Limb paralysis", "Meningitis", "Tremors"],
    "reproductive-symptoms":   ["Abortion", "Embryonic loss", "Infertility", "Mummified fetuses", "Stillbirth", "Weak piglets"],
    "other-symptoms":          ["Eye inflammation", "Eye swelling", "Joint swelling", "Wasting"],
    "body-areas":              ["Abdomen", "Chest", "Ears", "Extremities", "Eyes", "Joints", "Neck", "Perineum", "Snout", "Tail"],
    "pig-types":               ["All", "Adult", "Boars", "Breeding sows", "Fattening pigs", "Piglets", "Suckling pigs", "Wean-to-finish", "Weaned piglets", "Young pigs"]
  };

  var ICON_SEARCH  = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  var ICON_CHEVRON = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
  var ICON_X       = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  var ICON_PLUS    = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';

  function slug(label) {
    return label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  // Reuse the page i18n catalog when present; fall back to literal.
  function tr(key, fallback) {
    return (typeof t === 'function') ? t(key) : fallback;
  }
  function byLabel(a, b) { return a.localeCompare(b); }

  function initPicker(root) {
    var vocabKey = root.dataset.vocab;
    var vocab = (VOCAB[vocabKey] || []).slice().sort(byLabel);
    var id = root.dataset.pickerId || ('chip-picker-' + Math.random().toString(36).slice(2, 8));
    var menuId  = id + '-menu';
    var chipsId = id + '-chips';
    var placeholderKey = root.dataset.placeholderKey || 'chipPicker.searchSymptoms';
    var addVocabKey    = root.dataset.addvocabKey   || 'chipPicker.addVocab';
    var labelText = root.dataset.label || '';
    // Areas variant tags its chips green (.badge is-safe); every
    // other vocabulary uses the default info (blue) tone.
    var chipTone = root.classList.contains('chip-picker--areas') ? 'is-safe' : 'is-info';

    // Source of truth: selected display labels.
    var selected = (root.dataset.selected || '').split(',')
      .map(function (s) { return s.trim(); })
      .filter(Boolean);

    /* ---- build the static skeleton ---- */
    var label = document.createElement('label');
    label.className = 'field__label chip-picker__field-label';
    label.setAttribute('for', id);
    if (root.dataset.labelKey) label.dataset.i18n = root.dataset.labelKey;
    label.textContent = labelText;

    var chips = document.createElement('ul');
    chips.className = 'chip-picker__chips';
    chips.id = chipsId;
    chips.setAttribute('aria-label', 'Selected ' + labelText.toLowerCase());

    var search = document.createElement('div');
    search.className = 'chip-picker__search';
    search.innerHTML =
      '<span class="chip-picker__search-icon" aria-hidden="true">' + ICON_SEARCH + '</span>' +
      '<input type="text" id="' + id + '" class="chip-picker__input" autocomplete="off" ' +
        'aria-autocomplete="list" aria-controls="' + menuId + '" aria-expanded="false" role="combobox" />' +
      '<button type="button" class="chip-picker__toggle" tabindex="-1">' + ICON_CHEVRON + '</button>';
    var input  = search.querySelector('.chip-picker__input');
    var toggle = search.querySelector('.chip-picker__toggle');
    input.placeholder = root.dataset.placeholder || tr(placeholderKey, 'Search…');
    toggle.setAttribute('aria-label', tr('chipPicker.openMenu', 'Open menu'));

    var menu = document.createElement('div');
    menu.className = 'chip-picker__menu';
    menu.id = menuId;
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-multiselectable', 'true');
    menu.setAttribute('aria-hidden', 'true');
    var options = document.createElement('div');
    options.className = 'checkbox-list checkbox-list--sm';
    options.setAttribute('role', 'presentation');
    menu.appendChild(options);
    // The "+ Add new …" affordance is the LAST row of the same
    // checkbox-list — it's not a separate footer panel. It picks up
    // row layout from .checkbox-list__row and accent styling from
    // .chip-picker__add-row. The button is appended after all vocab
    // options below.
    var addRow = document.createElement('button');
    addRow.type = 'button';
    addRow.className = 'checkbox-list__row chip-picker__add-row';
    addRow.setAttribute('data-action', 'add-vocab');
    addRow.setAttribute('data-vocab', vocabKey);
    addRow.innerHTML =
      ICON_PLUS +
      '<span>' + (root.dataset.addvocab || tr(addVocabKey, 'Add to vocabulary')) + '</span>';

    root.appendChild(label);
    root.appendChild(chips);
    root.appendChild(search);
    root.appendChild(menu);

    /* ---- vocabulary options ---- */
    var optionEls = {};   // slug -> <label> row
    function makeOption(value) {
      // Each option row is a canonical .checkbox (form.css) inside
      // the .checkbox-list — no bespoke option markup or styling.
      var row = document.createElement('label');
      row.className = 'checkbox checkbox--sm checkbox-list__row';
      row.id = id + '-opt-' + slug(value);
      row.dataset.tagValue = slug(value);
      row.dataset.label = value;
      row.setAttribute('role', 'option');
      row.setAttribute('aria-selected', 'false');
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      var span = document.createElement('span');
      span.textContent = value;
      row.appendChild(cb);
      row.appendChild(span);
      return row;
    }
    vocab.forEach(function (value) {
      var row = makeOption(value);
      optionEls[slug(value)] = row;
      options.appendChild(row);
    });
    options.appendChild(addRow);

    /* ---- selection model ---- */
    function isSelected(value) {
      var s = slug(value);
      return selected.some(function (v) { return slug(v) === s; });
    }
    function renderChips() {
      chips.innerHTML = '';
      selected.forEach(function (value) {
        // Each chip IS a .badge (default size + tone); the chip-picker
        // only adds the remove button and its layout glue.
        var li = document.createElement('li');
        li.className = 'chip-picker__chip badge ' + chipTone;
        li.appendChild(document.createTextNode(value));
        var remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'chip-picker__chip-remove';
        remove.dataset.tagValue = slug(value);
        remove.setAttribute('aria-label',
          tr('chipPicker.removeLabel', 'Remove {tag}').replace('{tag}', value));
        remove.innerHTML = ICON_X;
        li.appendChild(remove);
        chips.appendChild(li);
      });
    }
    function syncOption(value) {
      var row = optionEls[slug(value)];
      if (!row) return;
      var on = isSelected(value);
      row.classList.toggle('is-checked', on);
      row.setAttribute('aria-selected', on ? 'true' : 'false');
      var cb = row.querySelector('input[type="checkbox"]');
      if (cb) cb.checked = on;
    }
    function addTag(value) {
      if (isSelected(value)) return;
      selected.push(value);
      renderChips();
      syncOption(value);
    }
    function removeTag(value) {
      var s = slug(value);
      selected = selected.filter(function (v) { return slug(v) !== s; });
      renderChips();
      syncOption(value);
    }
    function toggleTag(value) {
      if (isSelected(value)) removeTag(value); else addTag(value);
    }

    renderChips();
    vocab.forEach(syncOption);

    /* ---- open / close ---- */
    var activeIndex = -1;
    function visibleOptions() {
      return Array.prototype.filter.call(options.children, function (li) {
        return !li.hidden && li !== addRow;
      });
    }
    function setActive(idx) {
      var vis = visibleOptions();
      Array.prototype.forEach.call(options.children, function (li) { li.classList.remove('is-active'); });
      activeIndex = idx;
      if (idx >= 0 && idx < vis.length) {
        vis[idx].classList.add('is-active');
        input.setAttribute('aria-activedescendant', vis[idx].id);
        vis[idx].scrollIntoView({ block: 'nearest' });
      } else {
        input.removeAttribute('aria-activedescendant');
      }
    }
    function open() {
      if (root.classList.contains('is-open')) return;
      root.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      input.setAttribute('aria-expanded', 'true');
    }
    function close() {
      if (!root.classList.contains('is-open')) return;
      root.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      input.setAttribute('aria-expanded', 'false');
      setActive(-1);
    }

    // Clicking any picker surface except a chip-remove or an option
    // opens the dropdown and focuses the search input.
    root.addEventListener('click', function (e) {
      if (e.target.closest('.chip-picker__chip-remove')) return;
      if (e.target.closest('.checkbox-list__row')) return;
      if (e.target.closest('.chip-picker__toggle')) return;
      open();
      input.focus();
    });
    // The chevron toggles — open if closed, close if open.
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (root.classList.contains('is-open')) { close(); }
      else { open(); input.focus(); }
    });

    /* ---- toggle a tag (label click or checkbox click both fire
            a native change; programmatic syncs do not) ---- */
    options.addEventListener('change', function (e) {
      var cb = e.target;
      if (!cb || cb.type !== 'checkbox') return;
      var row = cb.closest('.checkbox-list__row');
      if (!row) return;
      if (cb.checked) addTag(row.dataset.label);
      else            removeTag(row.dataset.label);
    });

    /* ---- remove a chip ---- */
    chips.addEventListener('click', function (e) {
      var btn = e.target.closest('.chip-picker__chip-remove');
      if (!btn) return;
      var s = btn.dataset.tagValue;
      var match = selected.filter(function (v) { return slug(v) === s; })[0];
      if (match) removeTag(match);
    });

    /* ---- filter ---- */
    function applyFilter() {
      var q = input.value.trim().toLowerCase();
      Array.prototype.forEach.call(options.children, function (li) {
        // The add-row carries no data-label and is never filtered out:
        // keep it reachable even when a query matches no vocab term.
        if (li === addRow) return;
        li.hidden = !!q && li.dataset.label.toLowerCase().indexOf(q) === -1;
      });
      setActive(-1);
    }
    input.addEventListener('input', applyFilter);

    /* ---- keyboard ---- */
    input.addEventListener('keydown', function (e) {
      var vis = visibleOptions();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        open();
        setActive(Math.min(activeIndex + 1, vis.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive(Math.max(activeIndex - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (root.classList.contains('is-open') && activeIndex >= 0 && vis[activeIndex]) {
          toggleTag(vis[activeIndex].dataset.label);
        } else {
          open();
        }
      } else if (e.key === 'Escape') {
        if (root.classList.contains('is-open')) { e.preventDefault(); close(); input.focus(); }
      } else if (e.key === 'Backspace' && input.value === '') {
        if (selected.length) removeTag(selected[selected.length - 1]);
      } else if (e.key === 'Tab') {
        close();
      }
    });

    /* ---- add to vocabulary (admin-gated; mockup grants all
            viewers permission). A real build swaps the prompt for
            an inline form or modal. ---- */
    addRow.addEventListener('click', function () {
      var raw = window.prompt(tr(addVocabKey, 'Add to vocabulary'));
      if (!raw) { input.focus(); return; }
      var value = raw.trim();
      if (!value) { input.focus(); return; }
      var existing = vocab.filter(function (v) { return slug(v) === slug(value); })[0];
      if (existing) { addTag(existing); input.focus(); return; }
      vocab.push(value);
      vocab.sort(byLabel);
      var row = makeOption(value);
      optionEls[slug(value)] = row;
      // Existing insertBefore math still works: when the new value
      // sorts to position k in `vocab`, options.children[k] is the
      // right neighbour (which may be the add-row if k === vocab.length-1).
      options.insertBefore(row, options.children[vocab.indexOf(value)] || addRow);
      addTag(value);
      input.focus();
    });

    /* ---- dismiss: outside click, or focus leaving the picker ---- */
    document.addEventListener('click', function (e) {
      if (!root.contains(e.target)) close();
    });
    root.addEventListener('focusout', function () {
      // Defer so a click landing on an option/checkbox keeps focus inside.
      setTimeout(function () {
        if (!root.contains(document.activeElement)) close();
      }, 0);
    });
  }

  function initAll() {
    document.querySelectorAll('[data-chip-picker]').forEach(initPicker);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
