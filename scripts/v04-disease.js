  /* ────────────── UI STRING CATALOG ──────────────
     Localizes the UI chrome (button labels, section titles, banner
     keys, etc.) without touching per-field bilingual content. Every
     translatable chrome string carries a data-i18n="key" attribute;
     applyLocale() walks them and writes textContent from the catalog.
     Per-field language tabs (data-locale="en|vi") are an entirely
     separate concern — they switch the EN/VI content the admin has
     entered into a given field.
     The Vietnamese strings are an English-speaker's pass; refine
     against Farm2Vet's veterinary phrasing before broader use.    */
  var UI_STRINGS = {
    en: {
      "breadcrumb.dataManagement": "Data Management",
      "breadcrumb.wiki":           "Disease wiki",
      "page.back":                 "Back to catalogue",
      "banner.editing":            "Editing",
      "banner.active":             "Active",
      "banner.lastEdited":         "Last edited",
      "badge.active":              "Active",
      "badge.inactive":            "Inactive",
      "btn.newVersion":            "New version",
      "page.codename.view":        "ASF",
      "page.codename.edit":        "Editing ASF",
      "page.head.eyebrow":         "ASF",
      "page.head.title":           "African Swine Fever",
      "page.section.disease":      "Disease Info",
      "page.section.forms":        "Form-Specific Info",
      "page.section.additional":   "Additional",
      "topbar.savedAgo":           "Saved 2 minutes ago",
      "topbar.unsaved":            "Unsaved changes",
      "audit.title":               "2 incomplete fields",
      "audit.hint":                "Click a field to jump into edit mode focused on it.",
      "view.notProvided":          "Not provided",
      "view.noSymptomsRecorded":   "No symptoms recorded",
      "view.incompleteTag":        "6 incomplete",
      "view.emptyFormHint":        "No information added yet. Toggle Edit to populate this form.",
      "rail.status.hasContent":    "Has content",
      "btn.edit":                  "Edit",
      "btn.save":                  "Save changes",
      "btn.discard":               "Discard changes",
      "btn.setLive":               "Set as live",
      "btn.deactivate":            "Deactivate disease",
      "btn.deleteVersion":         "Delete version",
      "btn.deleteDisease":         "Delete disease…",
      "rail.version":              "Version",
      "rail.sections":             "Sections",
      "rail.group.disease":        "Disease Info",
      "rail.group.forms":          "Form-Specific Info",
      "rail.group.additional":     "Additional",
      "rail.status.filled":        "All fields filled",
      "rail.status.partial":       "Partial",
      "rail.status.empty":         "Empty",
      "section.basic.title":       "Basic information",
      "section.general.title":     "General information",
      "section.rates.title":       "Disease rates",
      "section.symptoms.title":    "Symptoms",
      "section.overview.title":    "Overview",
      "section.management.title":  "Management",
      "section.additional.title":  "Additional",
      "field.codename":            "Codename",
      "field.pigTypes":            "Pig types affected",
      "field.name":                "Name",
      "field.description":         "Description",
      "field.mortalityRate":       "Mortality rate",
      "field.morbidityRate":       "Morbidity rate",
      "field.feverRange":          "Fever range",
      "field.prevention":          "Prevention",
      "field.overview":            "Overview",
      "chipPicker.searchSymptoms": "Search symptoms…",
      "chipPicker.searchAreas":    "Search areas…",
      "chipPicker.searchPigTypes": "Search pig types…",
      "chipPicker.addVocab":       "Add new symptom to vocabulary",
      "chipPicker.addVocabAreas":  "Add new area to vocabulary",
      "chipPicker.addVocabPigTypes":"Add new pig type to vocabulary",
      "chipPicker.removeLabel":    "Remove {tag}",
      "chipPicker.openMenu":       "Open menu",
      "notes.add":                 "Add severity notes",
      "section.formnotes.title":    "Form-specific notes",
      "field.formnotes":           "Form-specific notes",
      "field.formnotes.hint":      "Explain how this form differs from the primary form (e.g., distinct clinical pattern, override rationale). Optional.",
      "form.default.tag":          "Default",
      "form.default.on":           "Default ✓",
      "form.default.off":          "Set as Default",
      "symptom.affectedAreas":     "Affected areas",
      "section.symptoms.eyebrow":  "Symptoms",
      "form.inherit":              "Inherit from Acute",
      "form.basic.title":          "Basic information",
      "form.general.title":        "General information",
      "form.management.title":     "Management",
      "form.immediate.title":      "Immediate Actions",
      "form.differential.title":   "Differential diagnosis",
      "form.add":                  "Add form",
      "form.rename":               "Rename",
      "form.duplicate":            "Duplicate",
      "form.delete":               "Delete",
      "form.collapse":             "Collapse",
      "form.expand":               "Expand"
    },
    vi: {
      "breadcrumb.dataManagement": "Quản lý dữ liệu",
      "breadcrumb.wiki":           "Wiki bệnh",
      "page.back":                 "Quay lại danh mục",
      "banner.editing":            "Đang sửa",
      "banner.active":             "Đang hoạt động",
      "banner.lastEdited":         "Sửa lần cuối",
      "badge.active":              "Đang hoạt động",
      "badge.inactive":            "Chưa kích hoạt",
      "btn.newVersion":            "Phiên bản mới",
      "page.codename.view":        "ASF",
      "page.codename.edit":        "Đang chỉnh sửa ASF",
      "page.head.eyebrow":         "ASF",
      "page.head.title":           "Bệnh dịch tả lợn châu Phi",
      "page.section.disease":      "Thông tin chung",
      "page.section.forms":        "Thông tin theo thể bệnh",
      "page.section.additional":   "Bổ sung",
      "topbar.savedAgo":           "Đã lưu 2 phút trước",
      "topbar.unsaved":            "Thay đổi chưa lưu",
      "audit.title":               "2 trường chưa hoàn thiện",
      "audit.hint":                "Nhấp vào một trường để chuyển sang chế độ sửa.",
      "view.notProvided":          "Chưa cung cấp",
      "view.noSymptomsRecorded":   "Chưa ghi nhận triệu chứng",
      "view.incompleteTag":        "6 chưa hoàn thiện",
      "view.emptyFormHint":        "Chưa có thông tin. Bật Sửa để điền vào thể này.",
      "rail.status.hasContent":    "Có nội dung",
      "btn.edit":                  "Sửa",
      "btn.save":                  "Lưu thay đổi",
      "btn.discard":               "Hủy thay đổi",
      "btn.setLive":               "Đặt làm bản chính",
      "btn.deactivate":            "Vô hiệu hóa bệnh",
      "btn.deleteVersion":         "Xóa phiên bản",
      "btn.deleteDisease":         "Xóa bệnh…",
      "rail.version":              "Version",
      "rail.sections":             "Mục",
      "rail.group.disease":        "Thông tin chung",
      "rail.group.forms":          "Thông tin theo thể bệnh",
      "rail.group.additional":     "Bổ sung",
      "rail.status.filled":        "Đã điền tất cả",
      "rail.status.partial":       "Một phần",
      "rail.status.empty":         "Trống",
      "section.basic.title":       "Thông tin cơ bản",
      "section.general.title":     "Thông tin chung",
      "section.rates.title":       "Tỷ lệ bệnh",
      "section.symptoms.title":    "Triệu chứng",
      "section.overview.title":    "Tổng quan",
      "section.management.title":  "Quản lý",
      "section.additional.title":  "Bổ sung",
      "field.codename":            "Mã định danh",
      "field.pigTypes":            "Loại lợn bị ảnh hưởng",
      "field.name":                "Tên",
      "field.description":         "Mô tả",
      "field.mortalityRate":       "Tỷ lệ tử vong",
      "field.morbidityRate":       "Tỷ lệ mắc bệnh",
      "field.feverRange":          "Khoảng sốt",
      "field.prevention":          "Phòng ngừa",
      "field.overview":            "Tổng quan",
      "chipPicker.searchSymptoms": "Tìm triệu chứng…",
      "chipPicker.searchAreas":    "Tìm vùng cơ thể…",
      "chipPicker.searchPigTypes": "Tìm loại lợn…",
      "chipPicker.addVocab":       "Thêm triệu chứng mới vào danh mục",
      "chipPicker.addVocabAreas":  "Thêm vùng cơ thể mới vào danh mục",
      "chipPicker.addVocabPigTypes":"Thêm loại lợn mới vào danh mục",
      "chipPicker.removeLabel":    "Xóa {tag}",
      "chipPicker.openMenu":       "Mở danh sách",
      "notes.add":                 "Thêm ghi chú mức độ",
      "section.formnotes.title":    "Ghi chú riêng cho thể",
      "field.formnotes":           "Ghi chú riêng cho thể",
      "field.formnotes.hint":      "Giải thích thể này khác với thể chính như thế nào (ví dụ: kiểu bệnh, lý do ghi đè). Không bắt buộc.",
      "form.default.tag":          "Mặc định",
      "form.default.on":           "Mặc định ✓",
      "form.default.off":          "Đặt làm mặc định",
      "symptom.affectedAreas":     "Vùng ảnh hưởng",
      "section.symptoms.eyebrow":  "Triệu chứng",
      "form.inherit":              "Kế thừa từ Acute",
      "form.basic.title":          "Thông tin cơ bản",
      "form.general.title":        "Thông tin tổng quát",
      "form.management.title":     "Quản lý",
      "form.immediate.title":      "Hành động khẩn cấp",
      "form.differential.title":   "Chẩn đoán phân biệt",
      "form.add":                  "Thêm thể",
      "form.rename":               "Đổi tên",
      "form.duplicate":            "Nhân bản",
      "form.delete":               "Xóa",
      "form.collapse":             "Thu gọn",
      "form.expand":               "Mở rộng"
    }
  };

  function t(key) {
    var locale = document.documentElement.dataset.uiLocale || 'en';
    return (UI_STRINGS[locale] && UI_STRINGS[locale][key])
      || UI_STRINGS.en[key]
      || key;
  }
  function applyLocale() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.dataset.i18n);
    });
  }


  // Per-field EN/VI tabs — each .disease-edit__lang-tabs controls
  // only the sibling [data-locale] inputs within its own .field.
  // Positions .tabs__indicator on init and on tab click so the
  // line variant's selected underline is visible.
  (function () {
    document.querySelectorAll('.disease-edit__lang-tabs').forEach(function (root) {
      var list = root.querySelector('.tabs__list');
      if (!list) return;
      var field = root.closest('.field');
      if (!field) return;
      var tabs = list.querySelectorAll('.tabs__tab');
      var indicator = list.querySelector('.tabs__indicator');
      var inputs = field.querySelectorAll('[data-locale]');

      function moveIndicator(tab) {
        if (!indicator) return;
        list.style.setProperty('--_x', tab.offsetLeft + 'px');
        list.style.setProperty('--_w', tab.offsetWidth + 'px');
      }

      function selectTab(tab) {
        var locale = tab.getAttribute('data-locale');
        tabs.forEach(function (t) {
          var on = t === tab;
          t.classList.toggle('is-selected', on);
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          t.setAttribute('tabindex', on ? '0' : '-1');
        });
        inputs.forEach(function (i) {
          i.hidden = i.getAttribute('data-locale') !== locale;
        });
        moveIndicator(tab);
      }

      // Seed the indicator on the initially-selected tab. Defer one
      // frame so fonts/layout settle before measuring offsets.
      var initial = list.querySelector('.tabs__tab.is-selected') || tabs[0];
      if (initial) {
        requestAnimationFrame(function () { moveIndicator(initial); });
      }

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () { selectTab(tab); });
      });
    });
  })();

  // Sticky TOC — highlight section in view.
  (function () {
    var links = document.querySelectorAll('.disease-edit__toc-item');
    var sections = Array.prototype.map.call(links, function (a) {
      return document.querySelector(a.getAttribute('href'));
    });
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var idx = sections.indexOf(entry.target);
          if (idx === -1) return;
          links.forEach(function (l) { l.classList.remove('is-current'); });
          links[idx].classList.add('is-current');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    sections.forEach(function (s) { if (s) io.observe(s); });
  })();

  /* ────────────── RAIL GROUP COLLAPSE ──────────────
     Rail-only. Hides/shows the group's item list via the CSS
     adjacent-sibling rule on aria-expanded="false". Does NOT touch
     the matching page card — the two states are independent so an
     admin can keep the rail tidy while a form card stays open.   */
  document.querySelectorAll('.disease-edit__toc-group-head--toggle').forEach(function (head) {
    head.addEventListener('click', function () {
      var expanded = head.getAttribute('aria-expanded') !== 'true';
      head.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  });

  /* ────────────── CARD COLLAPSE ──────────────
     Page-card only. Hides/shows the card body. Does NOT touch the
     matching rail group. Mirror of the rail-collapse controller
     above — same independence rationale.                         */
  document.querySelectorAll('.disease-edit__form-collapse').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.disease-edit__card');
      if (!card) return;
      var expanded = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      // Each card now carries two bodies (--edit / --view); toggle
      // both so collapse works whichever mode is rendered.
      card.querySelectorAll('.disease-edit__form-body').forEach(function (body) {
        body.hidden = !expanded;
      });
    });
  });

  /* ────────────── DELETE-FORM MODAL STAMP ──────────────
     The per-card trash button opens a shared modal. Stamp the form
     name into the dialog copy each time so the user sees the right
     form's name in the prompt.                                    */
  document.querySelectorAll('.disease-edit__form-delete').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.disease-edit__card');
      if (!card) return;
      var titleEl = card.querySelector('.disease-edit__form-title');
      var name = titleEl ? titleEl.textContent.trim() : 'this';
      var modal = document.getElementById('modal-delete-form');
      if (!modal) return;
      modal.querySelectorAll('[data-target-form]').forEach(function (el) {
        el.textContent = name;
      });
    });
  });

  /* ────────────── SEVERITY-NOTES VISIBILITY ──────────────
     The "+ Add severity notes" button is a true toggle of the
     notes panel, not a one-shot disclosure. Visibility is derived:
     the panel shows when any locale textarea has content OR the
     button has been clicked (aria-expanded="true"); the button
     shows otherwise. Clearing every textarea and moving focus out
     of the panel brings the button back.                          */
  (function () {
    function notesHaveContent(panel) {
      return Array.prototype.some.call(
        panel.querySelectorAll('.md-editor__textarea'),
        function (ta) { return ta.value.trim() !== ''; }
      );
    }
    function sync(btn, panel) {
      var open = notesHaveContent(panel)
              || btn.getAttribute('aria-expanded') === 'true';
      btn.hidden = open;
      panel.hidden = !open;
    }
    document.querySelectorAll('.disease-edit__notes-add').forEach(function (btn) {
      var field = btn.closest('.field');
      if (!field) return;
      var panel = field.querySelector('.disease-edit__notes');
      if (!panel) return;

      // Initialise from current textarea content, then correct any
      // drift between the markup and the derived rule.
      btn.setAttribute('aria-expanded',
        notesHaveContent(panel) ? 'true' : 'false');
      sync(btn, panel);

      btn.addEventListener('click', function () {
        btn.setAttribute('aria-expanded', 'true');
        sync(btn, panel);
        var en = panel.querySelector('.md-editor__textarea[data-locale="en"]')
              || panel.querySelector('.md-editor__textarea');
        if (en) en.focus();
      });

      panel.querySelectorAll('.md-editor__textarea').forEach(function (ta) {
        ta.addEventListener('input', function () { sync(btn, panel); });
      });

      // Leaving the panel with no content collapses it back to the
      // button — a panel opened by mistake doesn't linger empty.
      panel.addEventListener('focusout', function (e) {
        if (panel.contains(e.relatedTarget)) return;
        if (!notesHaveContent(panel)) {
          btn.setAttribute('aria-expanded', 'false');
          sync(btn, panel);
        }
      });
    });
  })();

  /* ────────────── PER-FIELD INHERITANCE TOGGLE ──────────────
     Each field on a non-primary clinical form carries an "Inherit
     from {primary}" checkbox. Checked = the field inherits (muted,
     read-only); unchecked = the field is overridden (editable).
     The checkbox drives the field's data-inherit attribute, which
     the CSS keys off for the muted treatment.                     */
  (function () {
    document.querySelectorAll('.disease-edit__inherit-checkbox').forEach(function (box) {
      var field = box.closest('.field');
      if (!field) return;
      box.checked = field.getAttribute('data-inherit') === 'true';
      box.addEventListener('change', function () {
        field.setAttribute('data-inherit', box.checked ? 'true' : 'false');
      });
    });
  })();

  /* =========================================================
     MODAL CONTROLLER — open / close / focus trap.
     Adapted from III-06-modal.html. data-modal-open opens the
     target by id; data-modal-close or [data-modal-static]'s
     own close button dismisses; Esc dismisses non-static modals;
     backdrop click dismisses non-static modals. Focus returns
     to the element that opened the modal. data-modal-default-focus
     on a child element overrides the default first-focusable target.
     ========================================================= */
  (function () {
    var FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
    var lastTrigger = null;

    function openModal(id) {
      var modal = document.getElementById(id);
      if (!modal) return;
      lastTrigger = document.activeElement;
      modal.setAttribute('aria-hidden', 'false');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { modal.classList.add('is-open'); });
      });
      document.body.classList.add('has-modal-open');
      var preferred = modal.querySelector('[data-modal-default-focus]');
      var fallback  = modal.querySelector(FOCUSABLE);
      var target = preferred || fallback;
      if (target) setTimeout(function () { target.focus(); }, 60);
    }
    function closeModal(modal) {
      if (!modal || !modal.classList.contains('is-open')) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      setTimeout(function () {
        if (!document.querySelector('.modal.is-open')) {
          document.body.classList.remove('has-modal-open');
        }
        if (lastTrigger && typeof lastTrigger.focus === 'function') {
          lastTrigger.focus();
          lastTrigger = null;
        }
      }, 220);
    }
    // Open triggers.
    document.querySelectorAll('[data-modal-open]').forEach(function (btn) {
      btn.addEventListener('click', function () { openModal(btn.dataset.modalOpen); });
    });
    // Close affordances.
    document.querySelectorAll('[data-modal-close]').forEach(function (btn) {
      btn.addEventListener('click', function () { closeModal(btn.closest('.modal')); });
    });
    // Backdrop dismiss — only when click lands on the backdrop itself,
    // not bubbled from a child; suppressed when data-modal-static.
    document.querySelectorAll('.modal').forEach(function (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target !== modal) return;
        if (modal.hasAttribute('data-modal-static')) return;
        closeModal(modal);
      });
    });
    // Escape dismiss for non-static modals.
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var open = document.querySelector('.modal.is-open');
      if (!open) return;
      if (open.hasAttribute('data-modal-static')) return;
      closeModal(open);
    });
    // Focus trap.
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var modal = document.querySelector('.modal.is-open');
      if (!modal) return;
      var nodes = Array.prototype.filter.call(modal.querySelectorAll(FOCUSABLE), function (el) {
        return !el.hasAttribute('disabled') && el.offsetParent !== null;
      });
      if (nodes.length === 0) return;
      var first = nodes[0], last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    // Expose for the version-picker guard to call into.
    window.__v04_openModal = openModal;
    window.__v04_closeModal = closeModal;
  })();


  /* =========================================================
     EDIT-MODE WORKFLOW — Edit toggles data-edit-mode="on" on
     <body>; CSS (the edit-mode visibility rules in the <style>
     block) drives the topbar view/edit split, so this controller
     only writes the one attribute and swaps the codename text.

     Dirty tracking — any input/change inside .disease-edit__main
     marks the form dirty: Save upgrades from secondary to CTA and
     enables, and the topbar caption flips to "Unsaved changes".
     Save and Discard (both still persistence no-ops) leave edit
     mode, which clears dirty.

     Leave-guard — while dirty, in-app anchor navigation is routed
     through modal-unsaved-switch; a beforeunload listener covers
     tab close / external nav. The version-picker controller still
     reuses the same modal for version switches; the two paths
     coexist via the modal's optional pendingHref field.
     ========================================================= */
  (function () {
    var editBtn      = document.getElementById('version-edit-toggle');
    var discardBtn   = document.getElementById('version-discard');
    var saveBtn      = document.getElementById('version-save');
    var codenameView = document.querySelector('.dash-topbar__codename-view');
    var codenameEdit = document.querySelector('.dash-topbar__codename-edit');
    var statusEl     = document.querySelector('.dash-topbar__save-status');
    var formArea     = document.querySelector('.disease-edit__main');
    if (!editBtn) return;

    /* ---- dirty state ---- */
    var isDirty = false;
    function setDirty(dirty) {
      if (dirty === isDirty) return;
      isDirty = dirty;
      if (statusEl) statusEl.dataset.state = dirty ? 'dirty' : 'clean';
      if (saveBtn) {
        saveBtn.disabled = !dirty;
        saveBtn.classList.toggle('btn--cta', dirty);
        saveBtn.classList.toggle('btn--secondary', !dirty);
      }
    }

    /* ---- edit-mode toggle ---- */
    function setEditMode(on) {
      // setAttribute (not toggleAttribute) so the value is literally
      // "on" — the CSS selectors match [data-edit-mode="on"].
      if (on) document.body.setAttribute('data-edit-mode', 'on');
      else    document.body.removeAttribute('data-edit-mode');
      editBtn.setAttribute('aria-pressed', String(on));
      if (codenameView) codenameView.hidden = on;
      if (codenameEdit) codenameEdit.hidden = !on;
      // Leaving edit mode always resets dirty state.
      if (!on) setDirty(false);
    }
    function isOn() {
      return document.body.getAttribute('data-edit-mode') === 'on';
    }

    editBtn.addEventListener('click', function () { setEditMode(!isOn()); });
    // Save / Discard are persistence no-ops for now; both leave edit
    // mode, and setEditMode(false) clears the dirty flag.
    if (discardBtn) discardBtn.addEventListener('click', function () { setEditMode(false); });
    if (saveBtn)    saveBtn.addEventListener('click',    function () { setEditMode(false); });

    /* ---- dirty tracking — scoped to the form column so the version
            picker / locale switch outside it don't trip it ---- */
    if (formArea) {
      formArea.addEventListener('input',  function () { setDirty(true); });
      formArea.addEventListener('change', function () { setDirty(true); });
    }

    /* ---- leave-guard · layer 1 — in-app anchor navigation.
            Capture phase so the click is caught before the link
            navigates; routes through the unsaved-changes modal. ---- */
    document.addEventListener('click', function (e) {
      if (!isDirty) return;
      var anchor = e.target.closest('a[href]');
      if (!anchor) return;
      var href = anchor.getAttribute('href');
      if (!href || href.startsWith('#')) return;   // in-page anchors stay
      if (anchor.target === '_blank') return;      // new tab is fine

      e.preventDefault();
      var modal = document.getElementById('modal-unsaved-switch');
      if (!modal) { window.location.href = href; return; }
      modal.querySelectorAll('[data-current-version]').forEach(function (el) {
        el.textContent = 'v3.3';
      });
      modal.querySelectorAll('[data-target-version]').forEach(function (el) {
        el.textContent = anchor.textContent.trim() || 'another page';
      });
      modal.dataset.pendingHref = href;   // picked up by the discard handler
      if (window.__v04_openModal) window.__v04_openModal('modal-unsaved-switch');
      else modal.setAttribute('aria-hidden', 'false');
    }, true);

    /* ---- leave-guard · the modal's Discard honours pendingHref ---- */
    (function () {
      var modal = document.getElementById('modal-unsaved-switch');
      if (!modal) return;
      // Cancel / X clear any pending destination so a later
      // version-switch reuse of this modal can't navigate stale.
      modal.querySelectorAll('[data-modal-close]').forEach(function (btn) {
        btn.addEventListener('click', function () { delete modal.dataset.pendingHref; });
      });
      var discardAndSwitch = modal.querySelector('[data-action="discard-and-switch"]');
      if (!discardAndSwitch) return;
      discardAndSwitch.addEventListener('click', function () {
        var href = modal.dataset.pendingHref;
        setDirty(false);
        if (window.__v04_closeModal) window.__v04_closeModal(modal);
        else modal.setAttribute('aria-hidden', 'true');
        if (href) { delete modal.dataset.pendingHref; window.location.href = href; }
      });
    })();

    /* ---- leave-guard · layer 2 — tab close / external nav ---- */
    window.addEventListener('beforeunload', function (e) {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = '';   // required for the browser to show its prompt
    });

    // Expose for the version-picker controller's version-switch guard.
    window.__v04_isEditMode = isOn;
    window.__v04_exitEditMode = function () { setEditMode(false); };
    // Exposed for the audit accordion: a row click enters edit mode.
    window.setEditMode = setEditMode;
  })();


  /* ────────────── INCOMPLETE-FIELDS AUDIT ──────────────
     A row in the view-mode audit accordion enters edit mode and
     focuses its field. The field ids are hand-authored to match a
     future schema; until those ids exist on the edit inputs the
     focus step is a graceful no-op (the edit-mode switch still
     fires, which is the headline behaviour). */
  document.querySelectorAll('.disease-edit__audit-row').forEach(function (row) {
    row.addEventListener('click', function () {
      var targetId = row.dataset.fieldTarget;
      if (window.setEditMode) window.setEditMode(true);
      // Defer the scroll/focus until the edit body is rendered.
      requestAnimationFrame(function () {
        var el = targetId && document.getElementById(targetId);
        if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (typeof el.focus === 'function') el.focus({ preventScroll: true });
      });
    });
  });


  /* =========================================================
     VERSION-PICKER — listens for dropdown:change, updates the
     trigger badge to reflect the new selection's status, and
     recalculates the enabled/disabled state of Set as live and
     Delete version. If edit mode is on at the moment the user
     picks a different version, intercept and open the unsaved-
     changes modal instead of letting the switch happen silently.
     The dropdown still flips its internal selection regardless
     (dropdown.js doesn't expose a cancel hook); the guard's job
     is to surface the question before any real save/discard
     logic runs in a future wiring pass.
     ========================================================= */
  (function () {
    var picker = document.getElementById('version-picker');
    if (!picker) return;
    // The status pill now lives in .disease-edit__version-head, a
    // sibling of the picker inside the rail version block — not inside
    // the dropdown trigger. Resolve it from the version block.
    var versionBlock = picker.closest('.disease-edit__version');
    var statusBadge = versionBlock && versionBlock.querySelector('.disease-edit__version-status');
    var activationBtn = document.getElementById('disease-activation-toggle');
    var deleteBtn     = document.getElementById('version-delete');

    var ICON_SET_LIVE =
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z"/>' +
        '<path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/>' +
        '<path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>' +
        '<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>' +
      '</svg>';
    var ICON_DEACTIVATE =
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>' +
        '<line x1="12" y1="2" x2="12" y2="12"/>' +
      '</svg>';

    function refreshActivationButton(status) {
      if (!activationBtn) return;
      var labelEl   = activationBtn.querySelector('.btn__label');
      var leadingEl = activationBtn.querySelector('.btn__leading');
      var isActive  = (status === 'active');
      var key       = isActive ? 'btn.deactivate' : 'btn.setLive';
      if (labelEl) {
        labelEl.dataset.i18n = key;
        labelEl.textContent  = t(key);
      }
      activationBtn.dataset.modalOpen = isActive ? 'modal-deactivate-disease' : 'modal-set-live';
      if (leadingEl) leadingEl.innerHTML = isActive ? ICON_DEACTIVATE : ICON_SET_LIVE;
    }

    function refreshActions() {
      var selected = picker.querySelector('.dropdown__option.is-selected');
      if (!selected) return;
      var status = selected.dataset.status; // "active" | "inactive"
      var total  = picker.querySelectorAll('.dropdown__option').length;
      refreshActivationButton(status);
      // Delete version is only allowed on Inactive versions, and only when
      // more than one version exists.
      if (deleteBtn) {
        deleteBtn.disabled = (status === 'active') || (total <= 1);
        // The delete button is icon-only in the rail, so the title is its
        // only pointer affordance — keep it set when the action is enabled.
        deleteBtn.title = deleteBtn.disabled
          ? (status === 'active' ? 'Can’t delete the Active version' : 'Can’t delete the only version')
          : 'Delete version';
      }
    }

    function refreshTriggerBadge() {
      var selected = picker.querySelector('.dropdown__option.is-selected');
      if (!selected || !statusBadge) return;
      var status = selected.dataset.status;
      var key = status === 'active' ? 'badge.active' : 'badge.inactive';
      statusBadge.dataset.i18n = key;
      statusBadge.textContent  = t(key);
      statusBadge.className = 'badge badge--sm ' + (status === 'active' ? 'is-safe' : 'is-warning') + ' disease-edit__version-status';
    }

    picker.addEventListener('dropdown:change', function (e) {
      // If edit mode is on, intercept the switch by opening the unsaved guard.
      // dropdown.js has already flipped the internal selection; here we just
      // surface the dialog. Save/discard actions in the modal would, in a real
      // implementation, either commit the buffer or revert it before the new
      // version's content loads. For now the modal is the prompt only.
      if (window.__v04_isEditMode && window.__v04_isEditMode()) {
        var modal = document.getElementById('modal-unsaved-switch');
        if (modal) {
          // Stamp the target version name into the modal copy.
          modal.querySelectorAll('[data-current-version]').forEach(function (el) {
            el.textContent = (e.detail && e.detail.label) ? e.detail.label : '';
          });
          modal.querySelectorAll('[data-target-version]').forEach(function (el) {
            el.textContent = (e.detail && e.detail.label) ? e.detail.label : '';
          });
          if (window.__v04_openModal) window.__v04_openModal('modal-unsaved-switch');
        }
      }
      refreshTriggerBadge();
      refreshActions();
    });

    // Stamp the version label into the activation and delete-version
    // modals each time those triggers are clicked, so the dialog reads
    // the picker's current selection.
    ['disease-activation-toggle', 'version-delete'].forEach(function (id) {
      var b = document.getElementById(id);
      if (!b) return;
      b.addEventListener('click', function () {
        var selected = picker.querySelector('.dropdown__option.is-selected');
        if (!selected) return;
        var label = selected.dataset.value;
        var modalId = b.dataset.modalOpen;
        var modal = document.getElementById(modalId);
        if (!modal) return;
        modal.querySelectorAll('[data-target-version]').forEach(function (el) {
          el.textContent = label;
        });
      });
    });

    // Initial paint.
    refreshTriggerBadge();
    refreshActions();
  })();


  /* =========================================================
     CHIP PICKER — multi-select tag input controller.
     Builds the three-row DOM (chips · search · dropdown menu)
     for every [data-chip-picker] from its data-vocab list, then
     wires open/close, tag toggling, chip removal, filtering,
     keyboard navigation, and the add-to-vocabulary affordance.
     Each picker is initialised independently. The vocabulary
     literal below stands in for a production API call.
     See outputs/V04_SYMPTOM_INPUT_SPEC.md.
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
      input.placeholder = tr(placeholderKey, 'Search…');
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
        '<span data-i18n="' + addVocabKey + '">' + tr(addVocabKey, 'Add to vocabulary') + '</span>';

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
          // Each chip IS a .badge (badge--sm + tone); the chip-picker
          // only adds the remove button and its layout glue.
          var li = document.createElement('li');
          li.className = 'chip-picker__chip badge badge--sm ' + chipTone;
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

    document.querySelectorAll('[data-chip-picker]').forEach(initPicker);
  })();


  /* ────────────── GLOBAL UI LOCALE ──────────────
     The pill toggle in the page header retitles UI chrome (labels,
     button text, section headings) by walking [data-i18n] elements
     and resetting textContent from the catalog. Per-field bilingual
     content tabs (data-locale="en|vi" on .disease-edit__lang-tabs)
     are a separate concern — this controller never touches them.   */
  (function () {
    var btns = document.querySelectorAll('[data-global-locale]');
    if (!btns.length) return;
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var locale = btn.dataset.globalLocale;
        document.documentElement.dataset.uiLocale = locale;
        // switch.js handles the segmented switch's own is-on / aria-pressed
        // state and indicator position; we only need to flip the locale
        // and re-apply the i18n catalog here.
        applyLocale();
      });
    });
    // Bootstrap on first paint.
    document.documentElement.dataset.uiLocale = 'en';
    applyLocale();
  })();


  /* =========================================================
     DELETE-DISEASE TYPED CONFIRMATION — enables the destructive
     submit button only when the user types the disease codename
     exactly. The codename is read from the eyebrow + title in
     the modal (currently hard-coded "ASF"); when this view
     is wired to real data, replace the literal with a data
     attribute on the modal.
     ========================================================= */
  (function () {
    var input = document.getElementById('delete-disease-confirm');
    var submit = document.getElementById('delete-disease-submit');
    if (!input || !submit) return;
    var EXPECTED = 'ASF';
    input.addEventListener('input', function () {
      submit.disabled = input.value.trim() !== EXPECTED;
    });
  })();


  /* =========================================================
     DEFAULT-FORM TOGGLE — one form per disease is the default.
     The pressed text-button on the active form reads "Default ✓"
     and is inert (clicking it does nothing); a click on a non-
     pressed toggle promotes that card and demotes the rest by
     flipping data-is-primary on the form cards. The view-mode
     "Default" badge follows the data attribute via CSS — no JS
     touches the badge directly.
     ========================================================= */
  (function () {
    var toggles = document.querySelectorAll('[data-default-toggle]');
    if (!toggles.length) return;

    function labelKey(pressed) {
      return pressed ? 'form.default.on' : 'form.default.off';
    }

    function refresh(toggle) {
      var card = toggle.closest('.disease-edit__card--form');
      var pressed = card && card.dataset.isPrimary === 'true';
      toggle.setAttribute('aria-pressed', pressed ? 'true' : 'false');
      var label = toggle.querySelector('.disease-edit__default-toggle-label');
      if (label) {
        label.dataset.i18n = labelKey(pressed);
        label.textContent = (typeof t === 'function') ? t(labelKey(pressed))
                                                      : (pressed ? 'Default ✓' : 'Set as Default');
      }
    }

    toggles.forEach(function (toggle) {
      refresh(toggle);
      toggle.addEventListener('click', function () {
        var card = toggle.closest('.disease-edit__card--form');
        if (!card || card.dataset.isPrimary === 'true') return;   // already default — inert
        document.querySelectorAll('.disease-edit__card--form').forEach(function (other) {
          other.dataset.isPrimary = 'false';
        });
        card.dataset.isPrimary = 'true';
        document.querySelectorAll('[data-default-toggle]').forEach(refresh);
      });
    });
  })();


  /* =========================================================
     VERSION-RAIL ACTIONS — placeholder handlers for the preview
     pages. New version → console.log + visual confirmation;
     Set as live → toggle the version-status badge from Inactive
     to Active; Delete version → open the delete modal if one
     exists, otherwise no-op. In a real build these hit the
     versioning API.
     ========================================================= */
  (function () {
    var newBtn  = document.querySelector('[title="New version"]');
    var liveBtn = document.querySelector('[title="Set as live"]');
    var delBtn  = document.querySelector('[title="Delete version"]');
    if (newBtn) newBtn.addEventListener('click', function () {
      console.info('[v04] New version clicked — wire to versioning API');
    });
    if (liveBtn) liveBtn.addEventListener('click', function () {
      var badge = document.querySelector('.disease-edit__version-status');
      if (!badge) return;
      badge.classList.remove('is-warning');
      badge.classList.add('is-safe');
      badge.textContent = (typeof t === 'function') ? t('badge.active') : 'Active';
    });
    if (delBtn) delBtn.addEventListener('click', function () {
      var modal = document.querySelector('[data-modal="modal-delete-version"]');
      if (modal && typeof modal.showModal === 'function') modal.showModal();
      else console.info('[v04] Delete version clicked — no modal in this preview');
    });
  })();


  /* =========================================================
     EDIT / SAVE / DISCARD — top-bar handoff. On the editor page
     (V-04-disease-input.html) the Edit button flips the body
     into edit mode; on the previews it navigates to V-04-disease-
     input.html so the user lands in the real editor. Discard and
     Save are inert placeholders on the previews.
     ========================================================= */
  (function () {
    var editBtn = document.querySelector('[data-action="edit"]');
    if (!editBtn) return;
    editBtn.addEventListener('click', function () {
      var onEditor = document.body.classList.contains('disease-edit--editor');
      if (onEditor) {
        document.body.classList.toggle('is-edit-mode');
      } else {
        window.location.href = (location.pathname.indexOf('/outputs/') >= 0)
          ? '../V-04-disease-input.html'
          : 'V-04-disease-input.html';
      }
    });
  })();


  /* =========================================================
     TOC SCROLL-SPY — on the previews the right-rail current
     marker is otherwise hard-coded to the first block. Observe
     each TOC target and move .is-current to the section in view.
     ========================================================= */
  (function () {
    var items = document.querySelectorAll('.disease-edit__toc-item[href^="#"]');
    if (!items.length) return;
    var targets = Array.prototype.map.call(items, function (a) {
      var el = document.querySelector(a.getAttribute('href'));
      return el ? { item: a, target: el } : null;
    }).filter(Boolean);
    if (!targets.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var pair = targets.filter(function (p) { return p.target === entry.target; })[0];
        if (!pair) return;
        targets.forEach(function (p) { p.item.classList.toggle('is-current', p === pair); });
      });
    }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });

    targets.forEach(function (p) { io.observe(p.target); });
  })();
