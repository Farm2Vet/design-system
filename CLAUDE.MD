# Farm2Vet Design System

Static design-system documentation site. Pure HTML/CSS/JS — no build
step, no framework, no bundler. Pages open directly in a browser.
Author: Jack. He works in VSCode on Windows; expect him to read the
diff and push back if visible behavior doesn't match what was claimed.

## Working agreement

Specs for new work arrive as markdown files in `outputs/` (e.g.
`outputs/SLIDER_SPEC.md`), produced by Cowork after a design pass.
The spec contains: files to create, files to modify (with snippets
or full source), conventions to honor, and a verification block
scoped to that change. Implement what's written; if a gap shows up,
ask Jack — he can patch the spec rather than improvise it himself.

## Repo layout

Pages live at the repo root, named by section:

| Pattern                | Section            | Examples                          |
| ---------------------- | ------------------ | --------------------------------- |
| `I-{slug}.html`        | Foundations        | `I-primitives.html`               |
| `II-{slug}.html`       | Foundations        | `II-semantics.html`               |
| `III-{NN}-{slug}.html` | Components         | `III-06-modal.html`, `III-14-tabs.html` |
| `IV-{NN}-{slug}.html`  | Assets             | `IV-01-logo.html`                 |
| `V-{NN}-{slug}.html`   | Mockups            | `V-03-hero.html`                  |

`design-system-v1.html` and `vinallergy-green*.html` are legacy /
preview pages that don't render the global nav and aren't part of
the section numbering.

## Token architecture (three tiers)

The design system is built on a strict three-tier token model.
Each layer references only the layer below. **Don't reach across
tiers.**

1. **Primitives** — raw values (color ramps, base spacing scale,
   raw type sizes). Documented on `I-primitives.html`. New primitives
   are rare and need a deliberate reason; the palette is meant to be
   stable.
2. **Semantics** — meaning-based aliases over primitives
   (e.g. action / surface / border / text roles). Documented on
   `II-semantics.html`. Add a new semantic when an existing one
   doesn't fit the use case.
3. **Components** — component-scoped tokens that reference
   semantics. Documented on each component page. New components
   introduce their own component tokens at this tier.

A component CSS file should reference semantic tokens, not
primitives. If a primitive seems necessary, that's usually a sign
a semantic is missing.

## CSS file architecture

Three layers, each in `styles/`:

1. **Foundations** — imported by every page in this fixed order:
   `tokens.css` → `base.css` → `typography.css` → `shell.css` →
   `global-nav.css`. Don't reorder; later layers depend on earlier.
2. **Components** — one file per component:
   `button.css`, `form.css`, `card.css`, `dropdown.css`, `modal.css`,
   `toast.css`, `alert.css`, `badge.css`, `tabs.css`. Component CSS
   only contains the component itself, not page-demo scaffolding.
3. **Page-specific** — `page-{tier}-{NN}.css` (e.g.
   `page-III-06.css`). Only the styles that exist on exactly one
   design-system page: anatomy diagrams, variant grids, demo stages.

Pages typically import 1–4 page-specific stylesheets. Cross-page
reuse of demo patterns is normal: `.token-table` lives in
`page-III-02.css`, `.usage-note` and `.preview-stage` in
`page-III-03.css`, showcase tile patterns in `page-III-05.css`. When
you reuse a pattern, **import the CSS file that owns it** rather
than redeclaring the rule.

## Component-page anatomy

Each component page follows roughly this structure. Match it for new
pages; deviate when the component genuinely needs more (e.g.
`III-12-sidebar.html` has a richer state-demo grid).

```
<header class="global-nav"> … </header>            ← inlined, see below
<main>
  <h1 class="h1">                                  ← hero
    <span class="num">III-{NN} / Components</span>
    {Component name}.
  </h1>
  <p class="lede"> … </p>
  <section class="anatomy"> … </section>           ← anatomy diagram
  <section class="variants"> … </section>          ← variant grid
  <section class="states">   … </section>          ← state matrix
  <section class="sizes">    … </section>          ← optional size stages
  <section class="tokens">   … </section>          ← .token-table
  <p class="usage-note"> … </p>                    ← rule + rationale
  <section class="examples"> … </section>          ← optional in-context demos
</main>
```

The hero `<span class="num">` value matches the filename prefix:
`I-primitives.html` → `I / Foundations`,
`III-06-modal.html` → `III-06 / Components`,
`V-03-hero.html` → `V-03 / Mockups`. Don't deviate.

## Demo pages consume canonical components

Component pages (`III-*`), asset pages (`IV-*`), and mockup pages
(`V-*`) render *real* components, not re-implementations. If you're
showing a button, alert, card, modal, dropdown, toast, tabs, or
anything else with a component CSS file, use the canonical class
(`.button`, `.alert`, `.card`, `.modal`, `.dropdown`, `.toast`,
`.tabs`) — don't hand-roll an approximation. The same rule applies
to page CSS: `page-III-*.css` is for layout scaffolding around the
component (variant grids, anatomy diagrams, preview stages,
showcase tiles), not for re-styling the component itself. If you
find a `.toast-mock` or `.button-fake` next to your demo, that's
drift to be cleaned up, not a pattern to extend.

If a demo page seems to need a pattern that no existing component
covers, **stop and ask Jack**. That's the signal a new component is
needed (own component CSS file, full BEM, documented on its own
component page), not a one-off inline pattern. Adding a component
to the system is a deliberate design decision; growing the system
silently through demo-page hacks is the failure mode this rule
exists to prevent.

## The inlined global nav (gotcha)

The `<header class="global-nav">` block is **hard-coded into every
page**, not loaded from a partial. ~20 root HTML files each carry
the same nav markup. The canonical source lives in
`outputs/apply_navbar.py` (`NAV_MARKUP` constant); a sibling
`outputs/make_placeholders.py` uses the same string when stamping
new pages.

**When you change anything in the nav** (new link, panel change,
markup tweak), you must:
1. Update `NAV_MARKUP` in `outputs/apply_navbar.py`
2. Update the equivalent constant in `outputs/make_placeholders.py`
3. Apply the change to every existing root HTML file that renders
   the nav (every page except `design-system-v1.html` and
   `vinallergy-green*.html`)

If you skip step 1–2, the next re-run of the build script will
silently revert your nav changes on every page.

Shared nav CSS (`styles/global-nav.css`) and runtime
(`scripts/global-nav.js`) are single-source — those don't need to be
edited per-page.

## Generators in `outputs/`

| Script                  | Purpose                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `apply_navbar.py`       | Stamps `NAV_MARKUP` into every page that should have nav. Re-run after nav changes.  |
| `make_placeholders.py`  | Creates new placeholder pages with the standard hero + nav skeleton.                 |
| `recover_tails.py`      | Repair script for the historical truncated-`</script>` issue.                        |

These are dev-time tools, not runtime code.

## Conventions

- Class naming uses **BEM** for component internals and plain
  **kebab-case** for page-demo scaffolding.
    - *Component CSS* (`button.css`, `alert.css`, `card.css`, etc.):
      `.alert` (block), `.alert__title` (element), `.alert--solid`
      (modifier), `.alert__action--strong` (element + modifier).
      Match this rigorously for new components.
    - *Page CSS* (`page-III-*.css`): plain kebab-case for one-off
      demo wrappers (`.token-table`, `.preview-stage`,
      `.usage-note`). Use BEM when a showcase block has real
      internal structure worth naming (`.alert-showcase__tile`).
- IDs only when needed for `aria-labelledby` or anchor links.
- `.reveal` class triggers an intersection-observer fade-in
  (see `<script>` block in `I-primitives.html` for the pattern).
- HTML files close cleanly: `</script>\n\n</body>\n</html>\n` if the
  trailing inline `<script>` is present, otherwise
  `</body>\n</html>\n`. Verify after edits that touch the bottom of
  the file.
- Don't introduce a build step, framework, or bundler. The site is
  intentionally static.

## Naming convention

Class names use BEM with a small extension for state flags. Read them
out loud — `.btn__label` = "the label part of btn"; `.btn--cta` =
"the cta variant of btn".

| Separator | Means | Example |
|---|---|---|
| `-` (single hyphen) | Word break inside a name | `btn-switch`, `form-version-card` |
| `--` (double hyphen) | BEM modifier — variant of the block | `.btn--cta`, `.btn--glass` |
| `__` (double underscore) | BEM element — part of the block | `.btn__label`, `.btn-switch__thumb` |
| `is-` / `has-` prefix | State flag, used alongside the block | `.is-on`, `.is-disabled` |
| `_` (single underscore) | Not used in this codebase | — |