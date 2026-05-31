# Spec — 04 Run results, Overview tab build-out

Work on the current branch. Do not create a new branch. Do not commit.
Do not push. Jack will review the diff in VSCode.

Single file touched: `workspace/automated-testing/04-results.html`.
Lo-fi wireframe under FR-385 — uses inline `<style>`, not the
design-system component CSS layer. This file does **not** import
`../../styles/tokens.css`; do not add the import as part of this
spec. Every new colour value below reuses hex that the file already
ships (chip / status / accuracy palette), so no token wiring is
needed.

There are five changes. They are independent — apply them in any
order, but the metastrip change introduces the colour-rule classes
that the Configurations and Statistics sections also use, so do that
one first if you are working linearly.

---

## 1. Metastrip — five cells, Performance Score in slot 2

The current metastrip has four cells (Status, High-score, Low-score,
Error). Add a fifth cell **Performance Score** between Status and
High-score, and apply a value-based colour rule to the score
(stronger weight, green / amber / red).

### 1a. Cell grid widens to five columns

Find the page-scope override (in the second `<style>` block, around
line 497):

```css
  .metastrip { grid-template-columns: repeat(4, 1fr); }
```

Replace with:

```css
  .metastrip { grid-template-columns: repeat(5, 1fr); }
```

### 1b. Add the colour-rule classes

Below the `.metastrip` rule, append three modifier classes plus a
heavier weight rule. These mirror the accuracy column in
`02-detail.html` (`.runrow__acc--high/mid/low`), but the **thresholds
are different** — see the inline note above the block.

```css
  /* Performance score — bolder, value-based colour.
     Thresholds: >80 green · 50-80 amber · <50 red.
     (02-detail's accuracy column uses a different 90/80 split — do
     not unify the two; this page's score is the broader composite,
     02-detail's is raw accuracy.) */
  .metastrip__value--score { font-weight: 700; font-size: 15px; letter-spacing: -0.01em; }
  .metastrip__value--score-high { color: #1F7A43; }   /* >80 */
  .metastrip__value--score-mid  { color: #9A5B00; }   /* 50-80 */
  .metastrip__value--score-low  { color: #B23B3B; }   /* <50 */
```

The size bump (13 → 15px) is the only typographic deviation from the
other cells; it earns the slot the user is meant to land on first.

### 1c. Insert the new cell

Find the existing metastrip block:

```html
          <!-- Meta strip -->
          <div class="metastrip">
            <div class="metastrip__cell">
              <div class="metastrip__label">Status</div>
              <div class="metastrip__value"><span class="status-dot status-dot--ok"></span>Completed</div>
            </div>
            <div class="metastrip__cell">
              <div class="metastrip__label">High-score</div>
              <div class="metastrip__value">9</div>
            </div>
```

Replace with (only the Status cell is unchanged; the Performance
Score cell is inserted between Status and High-score):

```html
          <!-- Meta strip -->
          <div class="metastrip">
            <div class="metastrip__cell">
              <div class="metastrip__label">Status</div>
              <div class="metastrip__value"><span class="status-dot status-dot--ok"></span>Completed</div>
            </div>
            <div class="metastrip__cell">
              <div class="metastrip__label">Performance score</div>
              <div class="metastrip__value metastrip__value--score metastrip__value--score-high">84.9<span style="font-weight:500;font-size:12px;color:#6B6B6B;margin-left:4px;">/ 100</span></div>
            </div>
            <div class="metastrip__cell">
              <div class="metastrip__label">High-score</div>
              <div class="metastrip__value">9</div>
            </div>
```

The wireframe value `84.9` falls in the green band on purpose — it
matches the composite mean used later in the Statistics section
(mean of Accuracy 83.3, Fluency 86.8, Efficiency 84.5 ≈ 84.9). If
you change the value, the modifier class must change with it:
`>80` → `--score-high`, `50-80` → `--score-mid`, `<50` →
`--score-low`.

---

## 2. Tabs — add Module Latency and Per-Disease as their own tabs

The current tab strip is `Overview · Cases · Low Score Analysis`.
The Overview panel today holds five placeholder sections; the user
wants Module Latency and Per-Disease pulled out into dedicated
tabs, sitting next to Overview so the analytics-style views stay
grouped before Cases.

Final tab order: **Overview · Module Latency · Per-Disease · Cases ·
Low Score Analysis**.

### 2a. Tab strip

Find:

```html
          <!-- Tabs -->
          <div class="tabs" role="tablist">
            <div class="tabs__item is-active" data-tab="overview" role="tab">Overview</div>
            <div class="tabs__item" data-tab="cases" role="tab">Cases</div>
            <div class="tabs__item" data-tab="lowscore" role="tab">Low Score Analysis</div>
          </div>
```

Replace with:

```html
          <!-- Tabs -->
          <div class="tabs" role="tablist">
            <div class="tabs__item is-active" data-tab="overview" role="tab">Overview</div>
            <div class="tabs__item" data-tab="latency" role="tab">Module Latency</div>
            <div class="tabs__item" data-tab="disease" role="tab">Per-Disease</div>
            <div class="tabs__item" data-tab="cases" role="tab">Cases</div>
            <div class="tabs__item" data-tab="lowscore" role="tab">Low Score Analysis</div>
          </div>
```

### 2b. Overview panel — drop the two moved placeholders

Find the current Overview panel body:

```html
          <!-- Overview tab -->
          <div class="tabpanel is-active" data-panel="overview">
            <div class="section"><p class="section__title">Configurations</p><p class="section__hint">To be added.</p></div>
            <div class="section"><p class="section__title">Statistics</p><p class="section__hint">To be added.</p></div>
            <div class="section"><p class="section__title">Cost Summary</p><p class="section__hint">To be added.</p></div>
            <div class="section"><p class="section__title">Module Latency</p><p class="section__hint">To be added.</p></div>
            <div class="section"><p class="section__title">Per-Disease</p><p class="section__hint">To be added.</p></div>
          </div><!-- /Overview tab -->
```

Replace with — Configurations and Statistics get their real
content (sections 3 and 4 below); Cost Summary stays placeholder
for now; Module Latency and Per-Disease are gone (they live in
their own panels below):

```html
          <!-- Overview tab -->
          <div class="tabpanel is-active" data-panel="overview">

            <!-- Configurations — see spec §3 -->
            <div class="section">
              <div class="section__head">
                <div>
                  <p class="section__title">Configuration</p>
                  <p class="section__hint">The parameters this suite used for this run. Read-only — to change them, open the parent suite.</p>
                </div>
              </div>
              <dl class="config-grid">
                <dt>Model</dt>
                <dd><span class="chip chip--mono" style="margin-right:8px;">GPT</span><span style="color:#6B6B6B;">gpt-4o-mini</span></dd>

                <dt>Mode</dt>
                <dd>Diagnostic</dd>

                <dt>Workers</dt>
                <dd>4</dd>

                <dt>Repetitions per profile</dt>
                <dd>1</dd>

                <dt>Anomaly detection</dt>
                <dd>Enabled</dd>

                <dt>Accuracy report</dt>
                <dd>Enabled</dd>
              </dl>
            </div>

            <!-- Statistics — see spec §4 -->
            <div class="section">
              <div class="section__head">
                <div>
                  <p class="section__title">Statistics</p>
                  <p class="section__hint">Headline metrics for this run and how each one has trended across recent revisions of the suite.</p>
                </div>
                <span class="annot" style="margin-left:0;">172 scored profiles</span>
              </div>

              <!-- §4a · Overall scores -->
              <div class="scorecards">
                <div class="scorecard">
                  <div class="scorecard__label">Accuracy</div>
                  <div class="scorecard__row">
                    <div class="scorecard__num">83.3<span class="scorecard__den">/ 100</span></div>
                  </div>
                  <div class="scorecard__bar"><span style="width:83.3%;"></span></div>
                  <div class="scorecard__sub">Right answer, supported by evidence.</div>
                </div>
                <div class="scorecard">
                  <div class="scorecard__label">Fluency</div>
                  <div class="scorecard__row">
                    <div class="scorecard__num">86.8<span class="scorecard__den">/ 100</span></div>
                  </div>
                  <div class="scorecard__bar"><span style="width:86.8%;"></span></div>
                  <div class="scorecard__sub">Readable, on-tone, no fragments.</div>
                </div>
                <div class="scorecard">
                  <div class="scorecard__label">Efficiency</div>
                  <div class="scorecard__row">
                    <div class="scorecard__num">84.5<span class="scorecard__den">/ 100</span></div>
                  </div>
                  <div class="scorecard__bar"><span style="width:84.5%;"></span></div>
                  <div class="scorecard__sub">Token cost vs. answer length.</div>
                </div>
              </div>

              <!-- §4b · Trend tiles -->
              <div class="section-label" style="margin-top:24px;">Trend across revisions</div>
              <div class="trendgrid">
                <div class="trendtile">
                  <div class="trendtile__label">Max latency</div>
                  <div class="trendtile__row">
                    <span class="trendtile__num">~8s</span>
                    <span class="trenddelta trenddelta--good">↓ 4s</span>
                  </div>
                  <svg class="spark" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
                    <polyline class="spark__line" points="0,4 33,11 66,18 100,22" />
                    <circle class="spark__vtx" cx="0"   cy="4"  r="1.6" />
                    <circle class="spark__vtx" cx="33"  cy="11" r="1.6" />
                    <circle class="spark__vtx" cx="66"  cy="18" r="1.6" />
                    <circle class="spark__dot" cx="100" cy="22" r="2" />
                  </svg>
                  <div class="trendtile__axis"><span>v2.4</span><span>v2.5</span><span>v3.0.0</span><span>v3.0.1</span></div>
                </div>
                <div class="trendtile">
                  <div class="trendtile__label">Mean accuracy</div>
                  <div class="trendtile__row">
                    <span class="trendtile__num">82.5</span>
                    <span class="trenddelta trenddelta--good">↑ 9.5</span>
                  </div>
                  <svg class="spark" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
                    <polyline class="spark__line" points="0,22 33,18 66,11 100,5" />
                    <circle class="spark__vtx" cx="0"   cy="22" r="1.6" />
                    <circle class="spark__vtx" cx="33"  cy="18" r="1.6" />
                    <circle class="spark__vtx" cx="66"  cy="11" r="1.6" />
                    <circle class="spark__dot" cx="100" cy="5"  r="2" />
                  </svg>
                  <div class="trendtile__axis"><span>v2.4</span><span>v2.5</span><span>v3.0.0</span><span>v3.0.1</span></div>
                </div>
                <div class="trendtile">
                  <div class="trendtile__label">Cost / conversation</div>
                  <div class="trendtile__row">
                    <span class="trendtile__num">$0.16</span>
                    <span class="trenddelta trenddelta--bad">↑ $0.06</span>
                  </div>
                  <svg class="spark spark--bad" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
                    <polyline class="spark__line" points="0,22 33,19 66,14 100,5" />
                    <circle class="spark__vtx" cx="0"   cy="22" r="1.6" />
                    <circle class="spark__vtx" cx="33"  cy="19" r="1.6" />
                    <circle class="spark__vtx" cx="66"  cy="14" r="1.6" />
                    <circle class="spark__dot" cx="100" cy="5"  r="2" />
                  </svg>
                  <div class="trendtile__axis"><span>v2.4</span><span>v2.5</span><span>v3.0.0</span><span>v3.0.1</span></div>
                </div>
                <div class="trendtile">
                  <div class="trendtile__label">Cost / evaluation</div>
                  <div class="trendtile__row">
                    <span class="trendtile__num">$0.25</span>
                    <span class="trenddelta trenddelta--flat">unchanged</span>
                  </div>
                  <svg class="spark spark--flat" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
                    <polyline class="spark__line" points="0,14 33,16 66,12 100,14" />
                    <circle class="spark__vtx" cx="0"   cy="14" r="1.6" />
                    <circle class="spark__vtx" cx="33"  cy="16" r="1.6" />
                    <circle class="spark__vtx" cx="66"  cy="12" r="1.6" />
                    <circle class="spark__dot" cx="100" cy="14" r="2" />
                  </svg>
                  <div class="trendtile__axis"><span>v2.4</span><span>v2.5</span><span>v3.0.0</span><span>v3.0.1</span></div>
                </div>
                <div class="trendtile">
                  <div class="trendtile__label">Concurrent users supported</div>
                  <div class="trendtile__row">
                    <span class="trendtile__num">40</span>
                    <span class="trenddelta trenddelta--new">new in v3.0.0</span>
                  </div>
                  <svg class="spark spark--new" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true">
                    <polyline class="spark__line" points="66,11 100,4" />
                    <circle class="spark__vtx" cx="66"  cy="11" r="1.6" />
                    <circle class="spark__dot" cx="100" cy="4"  r="2" />
                  </svg>
                  <div class="trendtile__axis"><span>v2.4</span><span>v2.5</span><span>v3.0.0</span><span>v3.0.1</span></div>
                </div>
              </div>
            </div>

            <div class="section"><p class="section__title">Cost Summary</p><p class="section__hint">To be added.</p></div>
          </div><!-- /Overview tab -->
```

### 2c. Add the two new panels

Immediately after the closing `</div><!-- /Overview tab -->`,
before the Cases panel, insert:

```html
          <!-- Module Latency tab -->
          <div class="tabpanel" data-panel="latency">
            <div class="section"><p class="section__title">Module Latency</p><p class="section__hint">Per-module timing for this run. To be added.</p></div>
          </div><!-- /Module Latency tab -->

          <!-- Per-Disease tab -->
          <div class="tabpanel" data-panel="disease">
            <div class="section"><p class="section__title">Per-Disease</p><p class="section__hint">Accuracy and case counts broken out by disease label. To be added.</p></div>
          </div><!-- /Per-Disease tab -->
```

The two new panels are placeholders by design — the user only asked
for the move; their contents are out of scope for this spec.

---

## 3. CSS — Configuration `<dl>` grid

Borrow the `.config-grid` rule from `02-detail.html` (lines
~511-519) so the Configuration section laid down in §2b can render.
Append it to the second (page-scope) `<style>` block, after the
existing `.dl-panel` rules:

```css
  /* Configuration definition list — borrowed verbatim from 02-detail
     so the read-only suite config renders identically here. */
  .config-grid {
    display: grid; grid-template-columns: 200px 1fr; row-gap: 14px; column-gap: 24px;
  }
  .config-grid > dt {
    font-size: 11px; letter-spacing: 0.1em;
    text-transform: uppercase; color: #8A8A8A;
    font-weight: 600; padding-top: 2px;
  }
  .config-grid > dd { margin: 0; font-size: 13px; color: #111; }
```

If the design-system later promotes `.config-grid` to a shared
component, both pages collapse onto it; for now the duplication is
deliberate and keeps the lo-fi pages self-contained.

---

## 4. CSS — Score cards and trend tiles

These are the two new patterns the Statistics section needs. Both
sit at the page scope (second `<style>` block) — append them after
the `.config-grid` rule from §3.

### 4a. Score cards (Overall scores)

A three-up grid of headline metric cards. The big number is the
focal point; the bar below it is a quick visual on the 0-100 scale;
the one-line description grounds what the metric is measuring.

```css
  /* Overall-score cards — three across, big numeric focus. */
  .scorecards {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 12px; margin-bottom: 4px;
  }
  .scorecard {
    border: 1px solid #E5E5E5; border-radius: 8px;
    background: #FFFFFF; padding: 16px 18px;
    display: flex; flex-direction: column; gap: 8px;
  }
  .scorecard__label {
    font-size: 10px; letter-spacing: 0.1em;
    text-transform: uppercase; color: #8A8A8A; font-weight: 600;
  }
  .scorecard__row { display: flex; align-items: baseline; gap: 6px; }
  .scorecard__num {
    font-size: 28px; font-weight: 600; color: #111;
    letter-spacing: -0.015em; line-height: 1;
  }
  .scorecard__den { font-size: 13px; color: #8A8A8A; font-weight: 500; margin-left: 2px; }
  .scorecard__bar {
    height: 4px; border-radius: 2px;
    background: #ECECEC; overflow: hidden;
  }
  .scorecard__bar > span {
    display: block; height: 100%; border-radius: 2px;
    background: #1F7A43;
  }
  .scorecard__sub { font-size: 11px; color: #6B6B6B; line-height: 1.4; }
```

The bar fill is the same green as `.metastrip__value--score-high`
(#1F7A43). When score-card colour logic is needed later (e.g. a
failing metric should show amber/red), reuse the
`.metastrip__value--score-*` thresholds — do not introduce a parallel
palette.

### 4b. Trend tiles (per-metric sparklines)

A grid of compact tiles, each showing one metric's current value, a
delta vs. the previous revision, and an inline SVG sparkline of how
the value has moved across the last several revisions. This is the
familiar Linear / Stripe dashboard pattern at small scale.

```css
  /* Trend tiles — one metric per tile, sparkline + delta. */
  .trendgrid {
    display: grid; grid-template-columns: repeat(5, 1fr);
    gap: 12px;
  }
  .trendtile {
    border: 1px solid #E5E5E5; border-radius: 8px;
    background: #FFFFFF; padding: 14px 16px;
    display: flex; flex-direction: column; gap: 8px;
    min-width: 0;
  }
  .trendtile__label {
    font-size: 10px; letter-spacing: 0.1em;
    text-transform: uppercase; color: #8A8A8A; font-weight: 600;
  }
  .trendtile__row {
    display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;
  }
  .trendtile__num {
    font-size: 20px; font-weight: 600; color: #111;
    letter-spacing: -0.01em; line-height: 1;
  }
  .trenddelta {
    font-size: 11px; font-weight: 600;
    padding: 2px 7px; border-radius: 99px;
    line-height: 1.2; white-space: nowrap;
  }
  .trenddelta--good { color: #1F7A43; background: #E8F1EC; }
  .trenddelta--bad  { color: #B23B3B; background: #F6E4E4; }
  .trenddelta--flat { color: #6B6B6B; background: #F0F0F0; }
  .trenddelta--new  { color: #4A3A75; background: #ECE8F4; }

  .spark { width: 100%; height: 28px; display: block; overflow: visible; }
  .spark__line {
    fill: none; stroke: #1F7A43; stroke-width: 1.5;
    stroke-linecap: round; stroke-linejoin: round;
    vector-effect: non-scaling-stroke;
  }
  .spark__dot { fill: #1F7A43; }
  .spark__vtx {
    fill: #FFFFFF; stroke: #1F7A43; stroke-width: 1.2;
    vector-effect: non-scaling-stroke;
  }
  .spark--bad  .spark__line { stroke: #B23B3B; fill: none; }
  .spark--bad  .spark__dot  { fill: #B23B3B; }
  .spark--bad  .spark__vtx  { stroke: #B23B3B; }
  .spark--flat .spark__line { stroke: #8A8A8A; fill: none; }
  .spark--flat .spark__dot  { fill: #8A8A8A; }
  .spark--flat .spark__vtx  { stroke: #8A8A8A; }
  .spark--new  .spark__line { stroke: #4A3A75; fill: none; }
  .spark--new  .spark__dot  { fill: #4A3A75; }
  .spark--new  .spark__vtx  { stroke: #4A3A75; }

  .trendtile__axis {
    display: flex; justify-content: space-between;
    font-size: 10px; color: #9B9B9B;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.04em;
  }
```

Three notes on the sparkline:

- **Each sparkline plots a four-release series.** The x-axis maps
  v2.4 / v2.5 / v3.0.0 / v3.0.1 to x = 0 / 33 / 66 / 100 inside the
  `viewBox`. The four `<span>`s in `.trendtile__axis` use
  `justify-content: space-between` and therefore land at exactly
  those x positions — so the labels align with their data points
  rather than free-floating under the line.
- Intermediate vertices render as small hollow circles
  (`.spark__vtx`, white fill + coloured stroke) so the eye reads
  the line as four plotted measurements, not a free-drawn curve.
  The trailing release keeps the filled dot (`.spark__dot`) to
  emphasise "you are here". Concurrent users supported is the
  only short series — the metric did not exist before v3.0.0, so
  the polyline starts at x=66 and only one intermediate vertex
  precedes the trailing dot.
- The polyline `points` and the y-values for vertices in §2b are
  pre-computed for the wireframe values. They are intentionally
  hand-tuned, not algorithmic — this is a static mock, not a chart
  library. Treat the numbers as copy: if a value or delta changes,
  walk both the `<polyline>` points **and** the matching
  `<circle cx="…" cy="…">` co-ordinates so the dots stay on the
  line.
- "Good direction" is metric-dependent: lower latency = good, higher
  cost = bad, unchanged = flat, brand-new metric = new. The colour
  classes (`--good`, `--bad`, `--flat`, `--new`) carry that
  semantics; the sparkline shape itself does not. This matters
  because a *cost* sparkline that climbs is *bad* even though it
  goes up — the `.spark--bad` modifier paints both line and
  vertex dots red so the chart agrees with the delta pill.

---

## 5. Convention notes (read once, don't ship anything from here)

A few cross-cutting things to honour while applying §1–§4. Nothing
here is a separate code change — it's the rationale behind choices
that may not be obvious from the patches alone.

- **Why a different threshold from 02-detail's accuracy column.**
  `02-detail` colours raw accuracy at 90/80; this page's Performance
  Score is a composite (Accuracy + Fluency + Efficiency weighted
  mean) and the user explicitly asked for >80 green / 50-80 amber /
  <50 red. Keep both rules — they measure different things.
- **Why score cards and trend tiles instead of one chart.** The user
  asked for "designed better" than the plain Metric/Mean table
  (image 2) and a trend chart per metric (image 3). Three big
  score cards solve the first ask; five small trend tiles solve the
  second without forcing a chart library into a static wireframe.
  An inline SVG polyline reads as a chart at this size and ships
  zero JS.
- **Why Cost Summary stays as a placeholder.** The user named the
  five Overview sections in the original spec and only addressed
  Configurations, Statistics, Module Latency and Per-Disease in
  this round. Leaving Cost Summary as the existing placeholder
  preserves the slot without inventing content that wasn't
  requested.
- **Why placeholders for Module Latency and Per-Disease.** Same
  rule — the user's ask was "move them to dedicated tabs", not
  "design their contents". The tab move is the deliverable; the
  panel bodies stay placeholders until a separate spec fills them.
- **No new component CSS file.** Score cards, trend tiles and
  sparklines are page-scoped patterns on a lo-fi wireframe. If any
  of them earn a permanent home, that's a separate promotion
  conversation (component page under `III-*`, BEM rename, own
  stylesheet under `styles/`). Do not pre-empt that here.
