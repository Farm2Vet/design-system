#!/usr/bin/env python3
"""Apply the new global-nav header markup to every design-system HTML page.

Run from inside design-system/ (the HTMLs sit at the repo root).

What it does, per file:
  1. Replaces the existing  <header class="topbar"> ... </header>  block
     with the canonical .global-nav markup.
  2. Inserts <link rel="stylesheet" href="styles/global-nav.css"> into the
     <head> (after the existing shell.css link, idempotent).
  3. Inserts <script src="scripts/global-nav.js" defer></script> in the
     <head> (idempotent).
  4. Sets <body data-page="<filename without extension>"> so the global
     nav can mark the current page.
"""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PAGES = [
    "I-primitives.html",
    "II-semantics.html",
    "III-01-typography.html",
    "III-02-buttons.html",
    "III-03-form.html",
    "III-04-dropdowns.html",
    "III-05-cards.html",
    "III-06-modal.html",
    "III-07-side-panel.html",
    "III-08-toast.html",
    "III-09-alert-badges.html",
    "III-10-header-navigation.html",
    "III-12-sidebar.html",
    "III-14-tabs.html",
    "IV-01-logo.html",
    "IV-02-icons.html",
    "IV-03-images.html",
    "V-01-wiki.html",
    "V-02-chatbot.html",
    "V-03-hero.html",
]

NAV_MARKUP = '''<!-- ========================== GLOBAL NAV ========================== -->
<header class="global-nav" aria-label="Design system navigation">
  <div class="global-nav__inner">

    <a href="design-system-v1.html" class="global-nav__brand" aria-label="Farm2Vet design system home">
      <img src="logo/logo-wordmark-color.svg" alt="Farm2Vet" class="global-nav__logo" />
      <small>Design System</small>
    </a>

    <nav class="global-nav__sections" aria-label="Design system sections">
      <ul class="global-nav__list">
        <li class="global-nav__item">
          <a class="global-nav__link" href="I-primitives.html">I. Primitives</a>
        </li>
        <li class="global-nav__item">
          <a class="global-nav__link" href="II-semantics.html">II. Semantics</a>
        </li>

        <li class="global-nav__item global-nav__item--has-panel" data-section="components">
          <button type="button" class="global-nav__link global-nav__trigger"
                  aria-expanded="false" aria-controls="global-nav-panel-components">
            III. Components
            <svg class="global-nav__chev" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 4 L6 8 L10 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div id="global-nav-panel-components" class="global-nav__panel" role="region" aria-label="Components">
            <div class="global-nav__panel-inner">
              <ul class="global-nav__panel-list">
                <li><a href="III-01-typography.html"><span class="global-nav__index">01</span><span>Typography</span></a></li>
                <li><a href="III-02-buttons.html"><span class="global-nav__index">02</span><span>Buttons</span></a></li>
                <li><a href="III-03-form.html"><span class="global-nav__index">03</span><span>Form</span></a></li>
                <li><a href="III-04-dropdowns.html"><span class="global-nav__index">04</span><span>Dropdowns</span></a></li>
                <li><a href="III-05-cards.html"><span class="global-nav__index">05</span><span>Cards</span></a></li>
                <li><a href="III-06-modal.html"><span class="global-nav__index">06</span><span>Modal Dialog</span></a></li>
                <li><a href="III-07-side-panel.html" class="is-placeholder"><span class="global-nav__index">07</span><span>Side Panel</span></a></li>
                <li><a href="III-08-toast.html"><span class="global-nav__index">08</span><span>Toast</span></a></li>
                <li><a href="III-09-alert-badges.html"><span class="global-nav__index">09</span><span>Alert &amp; Badge</span></a></li>
                <li><a href="III-10-header-navigation.html"><span class="global-nav__index">10</span><span>Header &amp; Nav Bar</span></a></li>
                <li><a href="III-12-sidebar.html"><span class="global-nav__index">12</span><span>Sidebar</span></a></li>
                <li><a href="III-14-tabs.html"><span class="global-nav__index">14</span><span>Tabs</span></a></li>
              </ul>
            </div>
          </div>
        </li>

        <li class="global-nav__item global-nav__item--has-panel" data-section="assets">
          <button type="button" class="global-nav__link global-nav__trigger"
                  aria-expanded="false" aria-controls="global-nav-panel-assets">
            IV. Assets
            <svg class="global-nav__chev" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 4 L6 8 L10 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div id="global-nav-panel-assets" class="global-nav__panel global-nav__panel--compact" role="region" aria-label="Assets">
            <div class="global-nav__panel-inner">
              <ul class="global-nav__panel-list">
                <li><a href="IV-01-logo.html"   class="is-placeholder"><span class="global-nav__index">01</span><span>Logo</span></a></li>
                <li><a href="IV-02-icons.html"  class="is-placeholder"><span class="global-nav__index">02</span><span>Icons</span></a></li>
                <li><a href="IV-03-images.html" class="is-placeholder"><span class="global-nav__index">03</span><span>Images</span></a></li>
              </ul>
            </div>
          </div>
        </li>

        <li class="global-nav__item global-nav__item--has-panel" data-section="mockups">
          <button type="button" class="global-nav__link global-nav__trigger"
                  aria-expanded="false" aria-controls="global-nav-panel-mockups">
            V. Mockups
            <svg class="global-nav__chev" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 4 L6 8 L10 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div id="global-nav-panel-mockups" class="global-nav__panel global-nav__panel--compact" role="region" aria-label="Mockups">
            <div class="global-nav__panel-inner">
              <ul class="global-nav__panel-list">
                <li><a href="V-01-wiki.html"    class="is-placeholder"><span class="global-nav__index">01</span><span>Wiki</span></a></li>
                <li><a href="V-02-chatbot.html" class="is-placeholder"><span class="global-nav__index">02</span><span>Chatbot</span></a></li>
                <li><a href="V-03-hero.html"    class="is-placeholder"><span class="global-nav__index">03</span><span>Hero</span></a></li>
              </ul>
            </div>
          </div>
        </li>

      </ul>
    </nav>

    <a href="#" class="global-nav__chip" aria-label="Design system version">v1.0</a>

  </div>
</header>
'''

# Match the entire GLOBAL NAV header block, including the canonical
# comment fence that opens it. The fence is a stable anchor across
# pages and survives the bar's evolution (topbar → global-nav → islands).
# Also retains a fallback for any page still carrying the legacy
# <header class="topbar"> block, plus the old "<!-- TOP BAR -->" comment.
TOPBAR_RE = re.compile(
    r'(?:<!--\s*=+\s*GLOBAL NAV\s*=+\s*-->\s*\n)'
    r'<header class="global-nav"[^>]*>.*?</header>\s*\n'
    r'|'
    r'(?:<!--\s*=+\s*TOP BAR\s*=+\s*-->\s*\n)?'
    r'<header class="topbar">.*?</header>\s*\n',
    re.DOTALL,
)

GLOBAL_NAV_CSS = '<link rel="stylesheet" href="styles/global-nav.css" />'
GLOBAL_NAV_JS = '<script src="scripts/global-nav.js" defer></script>'


def patch(path: Path) -> None:
    text = path.read_text(encoding="utf-8")

    # 1. Replace topbar block.
    new_text, n = TOPBAR_RE.subn(NAV_MARKUP, text, count=1)
    if n == 0:
        print(f"  WARN: no topbar block found in {path.name}")
        return

    # 2. Insert global-nav.css link after the shell.css link, once.
    if GLOBAL_NAV_CSS not in new_text:
        new_text = re.sub(
            r'(<link rel="stylesheet" href="styles/shell\.css"\s*/>\s*\n)',
            r'\1' + GLOBAL_NAV_CSS + '\n',
            new_text,
            count=1,
        )

    # 3. Insert global-nav.js before </head>, once.
    if GLOBAL_NAV_JS not in new_text:
        new_text = new_text.replace(
            '</head>',
            GLOBAL_NAV_JS + '\n\n</head>',
            1,
        )

    # 4. Set <body data-page="...">. If a data-page already exists, replace
    #    it; otherwise add one.
    page_id = path.stem  # e.g. "III-02-buttons"
    if re.search(r'<body[^>]*\sdata-page="', new_text):
        new_text = re.sub(
            r'(<body[^>]*\sdata-page=")[^"]*(")',
            lambda m: m.group(1) + page_id + m.group(2),
            new_text,
            count=1,
        )
    else:
        new_text = new_text.replace(
            '<body>',
            f'<body data-page="{page_id}">',
            1,
        )

    path.write_text(new_text, encoding="utf-8")
    print(f"  OK   {path.name}")


def main() -> None:
    for name in PAGES:
        path = ROOT / name
        if not path.exists():
            print(f"  MISS {name}")
            continue
        patch(path)


if __name__ == "__main__":
    main()
