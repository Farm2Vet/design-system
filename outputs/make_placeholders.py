#!/usr/bin/env python3
"""Generate placeholder HTML pages for unbuilt design-system sections.

Every placeholder embeds the canonical .global-nav block, sets
<body data-page="…">, and renders a single hero panel that names the
section and explains that the page is reserved for future
documentation.
"""

from pathlib import Path
from textwrap import dedent

ROOT = Path(__file__).resolve().parent.parent

NAV_BLOCK = '''<!-- ========================== GLOBAL NAV ========================== -->
<header class="global-nav" aria-label="Design system navigation">
  <div class="global-nav__inner">

    <a href="index.html" class="global-nav__brand" aria-label="Farm2Vet design system home">
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
                <li><a href="III-07-side-panel.html"><span class="global-nav__index">07</span><span>Side Panel</span></a></li>
                <li><a href="III-08-toast.html"><span class="global-nav__index">08</span><span>Toast</span></a></li>
                <li><a href="III-09-alert-badges.html"><span class="global-nav__index">09</span><span>Alert &amp; Badge</span></a></li>
                <li><a href="III-10-header-navigation.html"><span class="global-nav__index">10</span><span>Header &amp; Nav Bar</span></a></li>
                <li><a href="III-11-switch.html"><span class="global-nav__index">11</span><span>Switch</span></a></li>
                <li><a href="III-12-sidebar.html"><span class="global-nav__index">12</span><span>Sidebar</span></a></li>
                <li><a href="III-13-chip.html"><span class="global-nav__index">13</span><span>Chip</span></a></li>
                <li><a href="III-14-tabs.html"><span class="global-nav__index">14</span><span>Tabs</span></a></li>
                <li><a href="III-15-table.html"><span class="global-nav__index">15</span><span>Table</span></a></li>
                <li><a href="III-16-search-toolbar.html"><span class="global-nav__index">16</span><span>Search Toolbar</span></a></li>
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
                <li><a href="IV-01-logo.html"><span class="global-nav__index">01</span><span>Logo</span></a></li>
                <li><a href="IV-02-icons.html"><span class="global-nav__index">02</span><span>Icons</span></a></li>
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
                <li><a href="V-01-wiki.html"><span class="global-nav__index">01</span><span>Wiki</span></a></li>
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
</header>'''


PLACEHOLDERS = [
    {
        'file': 'IV-03-images.html',
        'title': 'Images',
        'section_eyebrow': 'Section 03 / Assets',
        'h1': 'Images.',
        'lede': (
            'Reserved page. The image library — aspect ratios, crop rules, '
            'colour treatment, and the per-context manifest — will be '
            'published here once authored.'
        ),
        'todo': [
            ['Aspect ratios', '1:1 · 4:3 · 16:9 · 21:9.'],
            ['Treatments', 'Full colour, duotone, desaturated.'],
            ['Crops', 'Subject-safe area rules.'],
            ['Manifest', 'Hero, card, illustration libraries.'],
        ],
    },
    {
        'file': 'V-02-chatbot.html',
        'title': 'Chatbot',
        'section_eyebrow': 'Section 02 / Mockups',
        'h1': 'Chatbot.',
        'lede': (
            'Reserved page. The Chatbot mockup — a reference layout for a '
            'conversational interface, demonstrating message bubbles, input '
            'anatomy, attachment handling, and streaming-response motion — '
            'will be published here once authored.'
        ),
        'todo': [
            ['Layout', 'Conversation column, composer footer, optional aside.'],
            ['Messages', 'User · assistant · system bubbles, with metadata.'],
            ['Composer', 'Multiline input, attachments, send actions.'],
            ['Streaming', 'Token-by-token reveal motion.'],
        ],
    },
    {
        'file': 'V-03-hero.html',
        'title': 'Hero',
        'section_eyebrow': 'Section 03 / Mockups',
        'h1': 'Hero.',
        'lede': (
            'Reserved page. The Hero mockup — a reference layout for a '
            'marketing landing page, demonstrating display typography, '
            'meta-strip, and primary call-to-action in concert — will be '
            'published here once authored.'
        ),
        'todo': [
            ['Display', 'text-display + lede + meta-strip.'],
            ['Imagery', 'Background, foreground, overlay treatment.'],
            ['Actions', 'Primary CTA, secondary, supporting link.'],
            ['Below the fold', 'Feature row, social proof, testimonial.'],
        ],
    },
]


PAGE_TEMPLATE = dedent('''\
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Farm2Vet · {title} — Design System</title>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />

<!-- Design system: shared, reusable foundation -->
<link rel="stylesheet" href="styles/tokens.css" />
<link rel="stylesheet" href="styles/base.css" />
<link rel="stylesheet" href="styles/typography.css" />
<link rel="stylesheet" href="styles/shell.css" />
<link rel="stylesheet" href="styles/global-nav.css" />
<!-- Reuse: usage-note pattern + .card-callout -->
<link rel="stylesheet" href="styles/page-III-03.css" />
<link rel="stylesheet" href="styles/page-III-05.css" />

<script src="scripts/global-nav.js" defer></script>

<style>
  .placeholder-card {{
    margin-top: var(--spacing-12x);
    padding: var(--spacing-8x);
    background: var(--background-default-subtle);
    border: var(--border-width-base) solid var(--border-default);
    border-radius: var(--radius-lg);
  }}
  .placeholder-card h3 {{
    font-family: var(--font-mono);
    font-size: var(--text-eyebrow);
    letter-spacing: var(--letter-spacing-eyebrow);
    text-transform: uppercase;
    color: var(--text-default-minimal);
    margin: 0 0 var(--spacing-4x);
  }}
  .placeholder-list {{
    list-style: none;
    margin: 0;
    padding: 0;
  }}
  .placeholder-list li {{
    display: grid;
    grid-template-columns: 16ch 1fr;
    column-gap: var(--spacing-6x);
    padding: var(--spacing-3x) 0;
    border-top: var(--border-width-base) solid var(--border-default);
    font-size: var(--text-body);
    color: var(--text-default);
  }}
  .placeholder-list li:first-child {{ border-top: none; }}
  .placeholder-list li strong {{
    font-family: var(--font-mono);
    font-size: var(--text-eyebrow);
    letter-spacing: var(--letter-spacing-eyebrow);
    text-transform: uppercase;
    color: var(--text-primary-strong);
    font-weight: var(--font-weight-medium);
    padding-top: var(--spacing-half);
  }}
</style>

</head>
<body data-page="{stem}">

{nav}

<main class="shell" id="top">

  <section class="hero">
    <div>
      <h1 class="text-display">
        <span class="num">{section_eyebrow}</span>
        {h1}
      </h1>
    </div>
    <div>
      <p class="lede">{lede}</p>
    </div>

    <dl class="meta-strip">
      <div><dt>Status</dt><dd>Placeholder</dd></div>
      <div><dt>Authored</dt><dd>—</dd></div>
      <div><dt>Tokens</dt><dd>—</dd></div>
      <div><dt>Variants</dt><dd>—</dd></div>
    </dl>
  </section>

  <div class="placeholder-card">
    <h3>Reserved scope · expected sub-areas</h3>
    <ul class="placeholder-list">
      {todo_items}
    </ul>
  </div>

  <footer>
    <span class="sigil">Farm2Vet — cultivated intelligence, since 2024.</span>
    <a href="index.html">← Design system home</a>
    <span>{section_eyebrow}</span>
  </footer>

</main>

</body>
</html>
''')


def main() -> None:
    for spec in PLACEHOLDERS:
        stem = spec['file'].replace('.html', '')
        todo_items = '\n      '.join(
            f'<li><strong>{label}</strong><span>{detail}</span></li>'
            for label, detail in spec['todo']
        )
        text = PAGE_TEMPLATE.format(
            title=spec['title'],
            stem=stem,
            nav=NAV_BLOCK,
            section_eyebrow=spec['section_eyebrow'],
            h1=spec['h1'],
            lede=spec['lede'],
            todo_items=todo_items,
        )
        out = ROOT / spec['file']
        out.write_text(text, encoding='utf-8')
        print(f'  OK   {spec["file"]}')


if __name__ == '__main__':
    main()
