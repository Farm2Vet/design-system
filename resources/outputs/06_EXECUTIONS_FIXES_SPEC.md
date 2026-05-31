# Spec — 06 Executions, action and sort cleanup

Work on the current branch. Do not create a new branch. Do not commit.
Do not push. Jack will review the diff in VSCode.

Single file touched: `workspace/automated-testing/06-executions.html`.
Lo-fi wireframe under FR-384 — uses inline `<style>`, not the
design-system component CSS layer. Colour tokens come from
`../../styles/tokens.css` (already imported). Every coloured value
introduced below resolves to a token; do not invent hex.

There are four changes. They are independent — apply them in any
order. Each section gives the exact markup to find and the exact
markup to replace it with.

---

## 1. Sort control — split field and direction

The current single field reads `Sort by · Started · newest`. The
middle dot is being used as a separator between the *field* and the
*direction*, which is two controls collapsed into one label. Split
them: a sort-field dropdown plus a small adjacent direction toggle.
Also expand the available sort fields.

### 1a. Filterbar grid

Find the filter-bar opening tag (around the page's existing filter
markup):

```html
<div class="filterbar" style="grid-template-columns: 1fr 160px 160px 200px;">
```

Replace with:

```html
<div class="filterbar" style="grid-template-columns: 1fr 160px 160px 160px 44px;">
```

Five columns instead of four — the previous 200px "Sort by" cell
splits into a 160px field plus a 44px direction toggle.

### 1b. Replace the Sort-by field

Find:

```html
<div class="field">
  <span class="label">Sort by</span>
  <span class="val">Started · newest</span>
  <span class="chev"></span>
</div>
```

Replace with these two siblings (the second cell sits in the new
44px column):

```html
<div class="field">
  <span class="label">Sort by</span>
  <span class="val">Started</span>
  <span class="chev"></span>
</div>
<button class="btn btn--icon" title="Newest first" aria-label="Sort direction: newest first" style="height:36px;width:36px;">
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="12" height="12" aria-hidden="true">
    <path d="M8 3v10M4 9l4 4 4-4"/>
  </svg>
</button>
```

No new CSS class — reuses `.btn--icon` with an inline height bump to
match the 36px filter-bar field height. The arrow points **down**
for newest-first (the default); when direction flips to oldest-first
the same icon mirrors (`M8 13V3M4 7l4-4 4 4` — do not bake this in
now, it's a runtime concern; ship the down-arrow only).

### 1c. Available sort options

The dropdown is non-interactive in the wireframe — only the visible
value matters. Leave the visible value as `Started` (matches the
default sort). For the spec record, the field offers, in this order:

- Started — kicked-off timestamp (default)
- Duration — wall-clock elapsed time
- Cumulative cost — dollar total
- Performance score — overall scorecard %
- Suite name — A–Z by suite title

These are not rendered as a menu in the lo-fi; they are documented
here so the hi-fi pass knows what the dropdown expands to.

---

## 2. Rerun action on finished rows

Finished runs (status donut `--finished`) currently expose only
*View results* + *Delete from history*. Add a leftmost **Rerun
suite** icon button. The action kicks off a fresh `RUN-NNN` against
the same suite version; the historical row stays in place.

### 2a. Reusable snippet

The rerun icon is a circular-arrow glyph — same SVG path the
top-of-page Refresh button already uses. Snippet to prepend inside
each affected `.actions` block, immediately before the existing
*View results* anchor:

```html
<button class="btn btn--icon" title="Rerun suite" aria-label="Rerun this suite">
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="13" height="13" aria-hidden="true"><path d="M14 8a6 6 0 1 1-1.76-4.24M14 3v3h-3"/></svg>
</button>
```

### 2b. Rows to patch

Four rows. For each, the `.actions` block currently reads:

```html
<div class="actions">
  <a class="btn btn--icon" href="./04-results.html" title="View results">…eye SVG…</a>
  <button class="btn btn--icon" title="Delete from history">…trash SVG…</button>
</div>
```

Insert the Rerun button as the first child of `.actions` in:

- **Row 5** — RUN-204 (TS-014 · Diagnostic baseline · v3)
- **Row 6** — RUN-198 (TS-014 · Diagnostic baseline · v3)
- **Row 8** — RUN-176 (TS-010 · Free-form · multilingual)
- **Row 10** — RUN-168 (TS-009 · Husbandry advisor — winter)

Final order per finished row: `[Rerun suite] [View results] [Delete]`.

Do **not** add Rerun to row 7 (RUN-180) or row 9 (RUN-172) — those
are paused, not finished; their Resume button already covers the
"start running again" intent.

---

## 3. RUN-212 — add a "Start now" action

Row 4 is queued (`0 / 6`, donut at `--pct: 0`). Today the only
action is *Cancel queue*, which under-serves the row — a queued run
should also offer a manual kick-off that bumps it ahead of the
scheduler.

Find the row's `.actions` block:

```html
<div class="actions">
  <button class="btn btn--icon" title="Cancel queue"><svg viewBox="0 0 16 16" fill="currentColor" width="11" height="11" aria-hidden="true"><rect x="4" y="4" width="8" height="8" rx="1"/></svg></button>
</div>
```

Replace with:

```html
<div class="actions">
  <button class="btn btn--icon" title="Start now" aria-label="Start this run now"><svg viewBox="0 0 16 16" fill="currentColor" width="11" height="11" aria-hidden="true"><path d="M4 2.5l9 5.5-9 5.5z"/></svg></button>
  <button class="btn btn--icon" title="Cancel queue" aria-label="Cancel queued run"><svg viewBox="0 0 16 16" fill="currentColor" width="11" height="11" aria-hidden="true"><rect x="4" y="4" width="8" height="8" rx="1"/></svg></button>
</div>
```

Order: `[Start now] [Cancel queue]`. No View — there's nothing to
view yet.

---

## 4. Donut glyph — queued vs paused

Today both queued (RUN-212) and paused mid-run (RUN-180, RUN-172)
rows render the donut with `.exec-donut--paused` and a **play
triangle** in the readout. The play triangle collides with the
play-triangle Resume button in the actions column — same glyph, two
different meanings on the same row. Split the two states.

### 4a. CSS — extend the rail

Find this CSS block (inside the page-scoped `<style>` near the
`.exec-donut--finished` rules):

```css
  .exec-donut--running  { --exec-donut-tone: var(--primary-500); }
  .exec-donut--paused   { --exec-donut-tone: var(--warning-500); }
  .exec-donut--paused   .exec-donut__readout { color: var(--warning-500); }
  .exec-donut--finished { --exec-donut-tone: var(--primary-500); }
  .exec-donut--finished .exec-donut__readout { color: var(--primary-500); }
```

Replace with:

```css
  .exec-donut--running  { --exec-donut-tone: var(--primary-500); }
  .exec-donut--paused,
  .exec-donut--queued   { --exec-donut-tone: var(--warning-500); }
  .exec-donut--paused   .exec-donut__readout,
  .exec-donut--queued   .exec-donut__readout { color: var(--warning-500); }
  .exec-donut--finished { --exec-donut-tone: var(--primary-500); }
  .exec-donut--finished .exec-donut__readout { color: var(--primary-500); }
```

Queued and paused share the warning ring tone; only the readout
glyph differs.

### 4b. RUN-212 — switch to `--queued`, keep play triangle

In row 4, find:

```html
<div class="exec-donut exec-donut--paused" style="--pct: 0;" role="img" aria-label="Queued, 0 of 6 cases">
```

Replace with:

```html
<div class="exec-donut exec-donut--queued" style="--pct: 0;" role="img" aria-label="Queued, 0 of 6 cases">
```

Leave the inner readout SVG (play triangle) unchanged — it's
semantically right for a queued, never-started run.

### 4c. RUN-180 — keep `--paused`, swap glyph to pause bars

In row 7 (RUN-180), find the readout block:

```html
<span class="exec-donut__readout" aria-hidden="true">
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M5 3.5l7 4.5-7 4.5z"/>
  </svg>
</span>
```

Replace with:

```html
<span class="exec-donut__readout" aria-hidden="true">
  <svg viewBox="0 0 16 16" fill="currentColor">
    <rect x="4" y="3" width="3" height="10" rx="0.5"/>
    <rect x="9" y="3" width="3" height="10" rx="0.5"/>
  </svg>
</span>
```

Class stays `exec-donut--paused`. Aria-label stays as-is.

### 4d. RUN-172 — same swap as RUN-180

In row 9 (RUN-172), apply the identical readout-SVG replacement
described in 4c. Class stays `exec-donut--paused`.

---

## Out of scope

- Do not touch the screen-nav, sidebar, topbar, page header, filter
  bar fields other than Sort, result strip, or pagination.
- Do not touch rows 1, 2, 3 (running) — their actions and donut are
  already correct.
- Do not introduce new CSS files. All changes live inside the
  existing inline `<style>` blocks of this one HTML file.
