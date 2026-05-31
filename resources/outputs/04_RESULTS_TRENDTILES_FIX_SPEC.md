# Spec — 04 Run results, trend tile sparkline fixes

Work on the current branch. Do not create a new branch. Do not commit.
Do not push. Jack will review the diff in VSCode.

Single file touched: `workspace/automated-testing/04-results.html`.
Lo-fi wireframe under FR-385 — uses inline `<style>`, not the
design-system component CSS layer.

Two independent changes to the §4b · Trend tiles grid (the five
`.trendtile` blocks under "Trend across revisions"). Apply in any
order.

---

## 1. Concurrent Users tile — drop the trendline

`Concurrent users supported` is a new metric introduced in v3.0.0 —
the two-point line (v3.0.0 → v3.0.1) is misleading because it implies
a trend the rest of the row earned across four data points. Strip the
trendline and keep just a single dot at the v3.0.1 position so the
tile stays vertically aligned with its neighbours.

### 1a. Replace the SVG inside the Concurrent Users tile

Find the fifth `.trendtile` block (search for
`>Concurrent users supported<`). Its current SVG is:

```html
                  <svg class="spark spark--new" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
                    <polyline class="spark__line" points="66,11 100,4" />
                    <circle class="spark__vtx" cx="66"  cy="11" r="1.6" />
                    <circle class="spark__dot" cx="100" cy="4"  r="2" />
                  </svg>
```

Replace with a single-dot SVG (no polyline, no v3.0.0 vertex):

```html
                  <svg class="spark spark--new" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
                    <circle class="spark__dot" cx="100" cy="14" r="2.5" />
                  </svg>
```

Notes:
- The dot moves to `cy="14"` (vertical centre of the 28-tall viewBox) so
  it reads as "current value, no comparison" rather than appearing to
  sit on an implied prior trajectory.
- Radius bumps to `2.5` so the lone dot carries enough weight to not
  look like a stray pixel.
- Axis labels (`v2.4 / v2.5 / v3.0.0 / v3.0.1`) stay as-is — the empty
  space to the left of the dot is what communicates "didn't exist
  before v3.0.1".

No CSS changes needed for this part — `.spark--new` already styles
`.spark__dot` purple.

---

## 2. Anchor the remaining four sparklines with an area fill

The four trend lines (Max latency, Mean accuracy, Cost / conversation,
Cost / evaluation) are 1.5px strokes floating in the middle of the
tile with no visual anchor. Add a soft area fill underneath each
polyline so the lines have weight and a clear baseline.

### 2a. Add fill rules to the page-scope `<style>` block

In the second `<style>` block, find the `.spark__dot` rule
(immediately after `.spark__line`):

```css
  .spark__line {
    fill: none; stroke: #1F7A43; stroke-width: 1.5;
    stroke-linecap: round; stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }
  .spark__dot { fill: #1F7A43; }
```

Insert a `.spark__fill` rule **between** `.spark__line` and
`.spark__dot`:

```css
  .spark__fill {
    fill: #1F7A43; opacity: 0.12; stroke: none;
  }
```

Then below the existing colour-variant rules (`.spark--bad`,
`.spark--flat`, `.spark--new`), add matching fill overrides. Find:

```css
  .spark--bad  .spark__line { stroke: #B23B3B; fill: none; }
  .spark--bad  .spark__dot  { fill: #B23B3B; }
  .spark--bad  .spark__vtx  { stroke: #B23B3B; }
  .spark--flat .spark__line { stroke: #8A8A8A; fill: none; }
  .spark--flat .spark__dot  { fill: #8A8A8A; }
  .spark--flat .spark__vtx  { stroke: #8A8A8A; }
  .spark--new  .spark__line { stroke: #4A3A75; fill: none; }
  .spark--new  .spark__dot  { fill: #4A3A75; }
  .spark--new  .spark__vtx  { stroke: #4A3A75; }
```

Append fill overrides for each variant (the `--new` variant gets one
too, harmlessly, even though we no longer render a fill polygon
inside that tile):

```css
  .spark--bad  .spark__fill { fill: #B23B3B; }
  .spark--flat .spark__fill { fill: #8A8A8A; }
  .spark--new  .spark__fill { fill: #4A3A75; }
```

### 2b. Add a `<polygon class="spark__fill">` to the four sparkline SVGs

For each of the four tiles that still has a trendline, insert a
`<polygon class="spark__fill">` as the **first** child of the `<svg>`
(so the polyline and dots render on top of the fill). The polygon
takes the same points as the polyline, then closes down to the
baseline (`y="28"`) before returning to the start.

**Max latency** — line is `0,4 33,11 66,18 100,22`, so the polygon
points are `0,4 33,11 66,18 100,22 100,28 0,28`:

```html
                  <svg class="spark" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
                    <polygon class="spark__fill" points="0,4 33,11 66,18 100,22 100,28 0,28" />
                    <polyline class="spark__line" points="0,4 33,11 66,18 100,22" />
                    <circle class="spark__vtx" cx="0"   cy="4"  r="1.6" />
                    <circle class="spark__vtx" cx="33"  cy="11" r="1.6" />
                    <circle class="spark__vtx" cx="66"  cy="18" r="1.6" />
                    <circle class="spark__dot" cx="100" cy="22" r="2" />
                  </svg>
```

**Mean accuracy** — line is `0,22 33,18 66,11 100,5`:

```html
                  <svg class="spark" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
                    <polygon class="spark__fill" points="0,22 33,18 66,11 100,5 100,28 0,28" />
                    <polyline class="spark__line" points="0,22 33,18 66,11 100,5" />
                    <circle class="spark__vtx" cx="0"   cy="22" r="1.6" />
                    <circle class="spark__vtx" cx="33"  cy="18" r="1.6" />
                    <circle class="spark__vtx" cx="66"  cy="11" r="1.6" />
                    <circle class="spark__dot" cx="100" cy="5"  r="2" />
                  </svg>
```

**Cost / conversation** (uses `spark--bad`) — line is `0,22 33,19 66,14 100,5`:

```html
                  <svg class="spark spark--bad" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
                    <polygon class="spark__fill" points="0,22 33,19 66,14 100,5 100,28 0,28" />
                    <polyline class="spark__line" points="0,22 33,19 66,14 100,5" />
                    <circle class="spark__vtx" cx="0"   cy="22" r="1.6" />
                    <circle class="spark__vtx" cx="33"  cy="19" r="1.6" />
                    <circle class="spark__vtx" cx="66"  cy="14" r="1.6" />
                    <circle class="spark__dot" cx="100" cy="5"  r="2" />
                  </svg>
```

**Cost / evaluation** (uses `spark--flat`) — line is `0,14 33,16 66,12 100,14`:

```html
                  <svg class="spark spark--flat" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
                    <polygon class="spark__fill" points="0,14 33,16 66,12 100,14 100,28 0,28" />
                    <polyline class="spark__line" points="0,14 33,16 66,12 100,14" />
                    <circle class="spark__vtx" cx="0"   cy="14" r="1.6" />
                    <circle class="spark__vtx" cx="33"  cy="16" r="1.6" />
                    <circle class="spark__vtx" cx="66"  cy="12" r="1.6" />
                    <circle class="spark__dot" cx="100" cy="14" r="2" />
                  </svg>
```

Do **not** add a fill polygon to the Concurrent Users tile — change
#1 strips that SVG down to just a dot.
