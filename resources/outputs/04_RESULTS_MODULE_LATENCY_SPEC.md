# Spec — 04 Run results, Module Latency tab

Work on the current branch (`master`). Do not create a new branch.
Do not commit. Do not push. Jack will review the diff in VSCode.

Single file touched: `workspace/automated-testing/04-results.html`.
Lo-fi wireframe under FR-385 — uses inline `<style>`, not the
design-system component CSS layer. Match the palette of existing
patterns in this file (`.scorecard`, `.trendtile`, `.ctable`,
`.stat__bar`); do not pull in `tokens.css`.

The Module Latency `.tabpanel` is currently a placeholder. Replace
its body with a sort-by switcher, a layered horizontal bar chart,
and a full sortable table. Two `.section` cards inside the panel;
CSS additions go in the same trailing `<style>` block that holds
the other panel extensions.

---

## Context

Module Latency is per-module timing for a single run. The data has
five numeric columns — `count`, `mean`, `p50`, `p95`, `max` — across
17 step:module rows. Counts vary widely (172–889) because of pipeline
fan-out, and the `max` column has one obvious outlier
(`judge:judge_agent` at 21.26s). The view must surface both shapes:
which modules are slow, and how the tail spreads vs. the typical case.

Decisions already taken (don't reopen):

- Layered bars — p50, mean, p95, max all rendered together as four
  stacked bars per module row. Not a single-metric switcher.
- Flat token — all bars use the same ink colour (no threshold
  coloring shifting to warning/danger above a value). Length carries
  the story; the eye reads "are the four bars similar length, or
  does `max` stretch out?".
- Horizontal orientation — labels like `3:extract_and_update_hypothesis`
  are long, so the label sits in a left column and bars run rightward.
- Dynamic sort — switching the sort-by metric re-sorts the chart rows
  descending by that metric. Default sort: `p95`.
- Tooltip carries count — count never appears in the chart bars
  (different unit); it shows in the row's right-hand cell and in the
  hover tooltip. Latency stays the chart's only story.
- Table below the chart — full sortable table holds all five metric
  columns, default sort by pipeline order (step:module ascending).

Bar order within a row, top-to-bottom: `p50` → `mean` → `p95` → `max`.
This matches the natural ascending order of the values (p50 ≤ mean ≤
p95 ≤ max for right-skewed latency distributions), so each row reads
as a short-to-long ramp when the tail is heavy and as four near-equal
bars when the distribution is tight.

---

## 1. Replace the Module Latency tab body

Find the existing placeholder:

```html
          <!-- Module Latency tab -->
          <div class="tabpanel" data-panel="latency">
            <div class="section"><p class="section__title">Module Latency</p><p class="section__hint">Per-module timing for this run. To be added.</p></div>
          </div><!-- /Module Latency tab -->
```

Replace the entire `<div class="tabpanel" data-panel="latency">…</div>`
block with the body below.

```html
          <!-- Module Latency tab -->
          <div class="tabpanel" data-panel="latency">

            <!-- §1 · Latency chart -->
            <div class="section">
              <div class="section__head">
                <div>
                  <p class="section__title">Module latency</p>
                  <p class="section__hint">p50, mean, p95, and max per module. Sort by any metric — rows reorder descending. Hover a row for the call count and exact values.</p>
                </div>
                <div class="modlat__legend">
                  <span class="modlat__swatch modlat__swatch--p50"></span><span class="modlat__swatchlabel">p50</span>
                  <span class="modlat__swatch modlat__swatch--mean"></span><span class="modlat__swatchlabel">mean</span>
                  <span class="modlat__swatch modlat__swatch--p95"></span><span class="modlat__swatchlabel">p95</span>
                  <span class="modlat__swatch modlat__swatch--max"></span><span class="modlat__swatchlabel">max</span>
                </div>
              </div>

              <div class="modlat__controls">
                <span class="modlat__controls-label">Sort by</span>
                <div class="filterchips">
                  <span class="filterchip">mean</span>
                  <span class="filterchip">p50</span>
                  <span class="filterchip is-active">p95</span>
                  <span class="filterchip">max</span>
                </div>
              </div>

              <!-- Chart axis -->
              <div class="modlat__axis">
                <span>0s</span><span>5s</span><span>10s</span><span>15s</span><span>20s</span><span>25s</span>
              </div>

              <!-- Chart rows · sorted desc by p95 (the default).
                   Each row sets --p50/--mean/--p95/--max in seconds;
                   CSS computes bar widths against a 25s scale. -->
              <div class="modlat__chart">

                <!-- Row shown in "hovered" state to demonstrate the
                     tooltip pattern; all other rows are resting. -->
                <div class="modlat__row is-hovered" style="--p50:11.95;--mean:11.99;--p95:14.96;--max:21.26;">
                  <div class="modlat__rowlabel">judge:judge_agent</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">11.95s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">11.99s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">14.96s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">21.26s</span></div>
                  </div>
                  <div class="modlat__count">172</div>
                  <div class="modlat__tooltip">
                    <div class="modlat__tooltip-title">judge:judge_agent</div>
                    <dl class="modlat__tooltip-grid">
                      <dt>p50</dt><dd>11.95s</dd>
                      <dt>mean</dt><dd>11.99s</dd>
                      <dt>p95</dt><dd>14.96s</dd>
                      <dt>max</dt><dd>21.26s</dd>
                      <dt>calls</dt><dd>172</dd>
                    </dl>
                  </div>
                </div>

                <div class="modlat__row" style="--p50:4.92;--mean:5.30;--p95:8.09;--max:9.92;">
                  <div class="modlat__rowlabel">5:give_final_diagnosis</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">4.92s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">5.30s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">8.09s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">9.92s</span></div>
                  </div>
                  <div class="modlat__count">172</div>
                </div>

                <div class="modlat__row" style="--p50:4.20;--mean:4.34;--p95:6.15;--max:10.35;">
                  <div class="modlat__rowlabel">3:collect_clinical_evidences</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">4.20s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">4.34s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">6.15s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">10.35s</span></div>
                  </div>
                  <div class="modlat__count">640</div>
                </div>

                <div class="modlat__row" style="--p50:3.98;--mean:4.18;--p95:5.38;--max:6.57;">
                  <div class="modlat__rowlabel">2&rarr;3:rerank_hypothesis</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">3.98s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">4.18s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">5.38s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">6.57s</span></div>
                  </div>
                  <div class="modlat__count">172</div>
                </div>

                <div class="modlat__row" style="--p50:3.39;--mean:3.56;--p95:4.98;--max:7.05;">
                  <div class="modlat__rowlabel">3:extract_and_update_hypothesis</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">3.39s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">3.56s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">4.98s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">7.05s</span></div>
                  </div>
                  <div class="modlat__count">640</div>
                </div>

                <div class="modlat__row" style="--p50:2.95;--mean:3.16;--p95:4.65;--max:6.26;">
                  <div class="modlat__rowlabel">2:extract_and_collect_general</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">2.95s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">3.16s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">4.65s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">6.26s</span></div>
                  </div>
                  <div class="modlat__count">889</div>
                </div>

                <div class="modlat__row" style="--p50:1.89;--mean:2.05;--p95:3.39;--max:5.66;">
                  <div class="modlat__rowlabel">4:collect_vaccine_evidences</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">1.89s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">2.05s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">3.39s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">5.66s</span></div>
                  </div>
                  <div class="modlat__count">172</div>
                </div>

                <div class="modlat__row" style="--p50:1.79;--mean:1.99;--p95:3.37;--max:4.23;">
                  <div class="modlat__rowlabel">5:producer_agent</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">1.79s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">1.99s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">3.37s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">4.23s</span></div>
                  </div>
                  <div class="modlat__count">172</div>
                </div>

                <div class="modlat__row" style="--p50:1.62;--mean:1.82;--p95:3.35;--max:6.11;">
                  <div class="modlat__rowlabel">2:producer_agent</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">1.62s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">1.82s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">3.35s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">6.11s</span></div>
                  </div>
                  <div class="modlat__count">717</div>
                </div>

                <div class="modlat__row" style="--p50:1.82;--mean:1.99;--p95:3.28;--max:5.71;">
                  <div class="modlat__rowlabel">3:producer_agent</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">1.82s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">1.99s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">3.28s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">5.71s</span></div>
                  </div>
                  <div class="modlat__count">640</div>
                </div>

                <div class="modlat__row" style="--p50:1.98;--mean:2.13;--p95:3.28;--max:4.20;">
                  <div class="modlat__rowlabel">4:producer_agent</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">1.98s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">2.13s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">3.28s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">4.20s</span></div>
                  </div>
                  <div class="modlat__count">172</div>
                </div>

                <div class="modlat__row" style="--p50:1.76;--mean:1.86;--p95:3.00;--max:3.17;">
                  <div class="modlat__rowlabel">4:collect_treatment_evidences</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">1.76s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">1.86s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">3.00s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">3.17s</span></div>
                  </div>
                  <div class="modlat__count">172</div>
                </div>

                <div class="modlat__row" style="--p50:1.54;--mean:1.69;--p95:2.93;--max:4.03;">
                  <div class="modlat__rowlabel">1:producer_agent</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">1.54s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">1.69s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">2.93s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">4.03s</span></div>
                  </div>
                  <div class="modlat__count">172</div>
                </div>

                <div class="modlat__row" style="--p50:1.04;--mean:1.21;--p95:2.48;--max:3.51;">
                  <div class="modlat__rowlabel">2&rarr;3:preprocess_farmer</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">1.04s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">1.21s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">2.48s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">3.51s</span></div>
                  </div>
                  <div class="modlat__count">172</div>
                </div>

                <div class="modlat__row" style="--p50:0.97;--mean:1.10;--p95:2.34;--max:3.12;">
                  <div class="modlat__rowlabel">1:step1_transition</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">0.97s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">1.10s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">2.34s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">3.12s</span></div>
                  </div>
                  <div class="modlat__count">172</div>
                </div>

                <div class="modlat__row" style="--p50:0.79;--mean:1.01;--p95:2.14;--max:3.74;">
                  <div class="modlat__rowlabel">0:greet_and_describe</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">0.79s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">1.01s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">2.14s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">3.74s</span></div>
                  </div>
                  <div class="modlat__count">172</div>
                </div>

                <div class="modlat__row" style="--p50:0.03;--mean:0.03;--p95:0.04;--max:0.24;">
                  <div class="modlat__rowlabel">2&rarr;3:formula_match</div>
                  <div class="modlat__bars">
                    <div class="modlat__bar modlat__bar--p50"><span class="modlat__barfill"></span><span class="modlat__barval">0.03s</span></div>
                    <div class="modlat__bar modlat__bar--mean"><span class="modlat__barfill"></span><span class="modlat__barval">0.03s</span></div>
                    <div class="modlat__bar modlat__bar--p95"><span class="modlat__barfill"></span><span class="modlat__barval">0.04s</span></div>
                    <div class="modlat__bar modlat__bar--max"><span class="modlat__barfill"></span><span class="modlat__barval">0.24s</span></div>
                  </div>
                  <div class="modlat__count">172</div>
                </div>

              </div><!-- /modlat__chart -->
            </div><!-- /§1 -->

            <!-- §2 · Full data table -->
            <div class="section">
              <div class="section__head">
                <div>
                  <p class="section__title">All modules</p>
                  <p class="section__hint">Full timing breakdown including <code>count</code>. Default sort: pipeline order (step:module ascending).</p>
                </div>
              </div>

              <div class="modlat-table">
                <div class="modlat-table__head">
                  <span class="modlat-table__cell modlat-table__cell--label">step:module <span class="modlat-table__sort is-active">&uarr;</span></span>
                  <span class="modlat-table__cell modlat-table__cell--num">count</span>
                  <span class="modlat-table__cell modlat-table__cell--num">mean</span>
                  <span class="modlat-table__cell modlat-table__cell--num">p50</span>
                  <span class="modlat-table__cell modlat-table__cell--num">p95</span>
                  <span class="modlat-table__cell modlat-table__cell--num">max</span>
                </div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">0:greet_and_describe</span><span class="modlat-table__cell modlat-table__cell--num">172</span><span class="modlat-table__cell modlat-table__cell--num">1.01s</span><span class="modlat-table__cell modlat-table__cell--num">0.79s</span><span class="modlat-table__cell modlat-table__cell--num">2.14s</span><span class="modlat-table__cell modlat-table__cell--num">3.74s</span></div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">1:producer_agent</span><span class="modlat-table__cell modlat-table__cell--num">172</span><span class="modlat-table__cell modlat-table__cell--num">1.69s</span><span class="modlat-table__cell modlat-table__cell--num">1.54s</span><span class="modlat-table__cell modlat-table__cell--num">2.93s</span><span class="modlat-table__cell modlat-table__cell--num">4.03s</span></div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">1:step1_transition</span><span class="modlat-table__cell modlat-table__cell--num">172</span><span class="modlat-table__cell modlat-table__cell--num">1.10s</span><span class="modlat-table__cell modlat-table__cell--num">0.97s</span><span class="modlat-table__cell modlat-table__cell--num">2.34s</span><span class="modlat-table__cell modlat-table__cell--num">3.12s</span></div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">2:extract_and_collect_general</span><span class="modlat-table__cell modlat-table__cell--num">889</span><span class="modlat-table__cell modlat-table__cell--num">3.16s</span><span class="modlat-table__cell modlat-table__cell--num">2.95s</span><span class="modlat-table__cell modlat-table__cell--num">4.65s</span><span class="modlat-table__cell modlat-table__cell--num">6.26s</span></div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">2:producer_agent</span><span class="modlat-table__cell modlat-table__cell--num">717</span><span class="modlat-table__cell modlat-table__cell--num">1.82s</span><span class="modlat-table__cell modlat-table__cell--num">1.62s</span><span class="modlat-table__cell modlat-table__cell--num">3.35s</span><span class="modlat-table__cell modlat-table__cell--num">6.11s</span></div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">2&rarr;3:formula_match</span><span class="modlat-table__cell modlat-table__cell--num">172</span><span class="modlat-table__cell modlat-table__cell--num">0.03s</span><span class="modlat-table__cell modlat-table__cell--num">0.03s</span><span class="modlat-table__cell modlat-table__cell--num">0.04s</span><span class="modlat-table__cell modlat-table__cell--num">0.24s</span></div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">2&rarr;3:preprocess_farmer</span><span class="modlat-table__cell modlat-table__cell--num">172</span><span class="modlat-table__cell modlat-table__cell--num">1.21s</span><span class="modlat-table__cell modlat-table__cell--num">1.04s</span><span class="modlat-table__cell modlat-table__cell--num">2.48s</span><span class="modlat-table__cell modlat-table__cell--num">3.51s</span></div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">2&rarr;3:rerank_hypothesis</span><span class="modlat-table__cell modlat-table__cell--num">172</span><span class="modlat-table__cell modlat-table__cell--num">4.18s</span><span class="modlat-table__cell modlat-table__cell--num">3.98s</span><span class="modlat-table__cell modlat-table__cell--num">5.38s</span><span class="modlat-table__cell modlat-table__cell--num">6.57s</span></div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">3:collect_clinical_evidences</span><span class="modlat-table__cell modlat-table__cell--num">640</span><span class="modlat-table__cell modlat-table__cell--num">4.34s</span><span class="modlat-table__cell modlat-table__cell--num">4.20s</span><span class="modlat-table__cell modlat-table__cell--num">6.15s</span><span class="modlat-table__cell modlat-table__cell--num">10.35s</span></div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">3:extract_and_update_hypothesis</span><span class="modlat-table__cell modlat-table__cell--num">640</span><span class="modlat-table__cell modlat-table__cell--num">3.56s</span><span class="modlat-table__cell modlat-table__cell--num">3.39s</span><span class="modlat-table__cell modlat-table__cell--num">4.98s</span><span class="modlat-table__cell modlat-table__cell--num">7.05s</span></div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">3:producer_agent</span><span class="modlat-table__cell modlat-table__cell--num">640</span><span class="modlat-table__cell modlat-table__cell--num">1.99s</span><span class="modlat-table__cell modlat-table__cell--num">1.82s</span><span class="modlat-table__cell modlat-table__cell--num">3.28s</span><span class="modlat-table__cell modlat-table__cell--num">5.71s</span></div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">4:collect_treatment_evidences</span><span class="modlat-table__cell modlat-table__cell--num">172</span><span class="modlat-table__cell modlat-table__cell--num">1.86s</span><span class="modlat-table__cell modlat-table__cell--num">1.76s</span><span class="modlat-table__cell modlat-table__cell--num">3.00s</span><span class="modlat-table__cell modlat-table__cell--num">3.17s</span></div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">4:collect_vaccine_evidences</span><span class="modlat-table__cell modlat-table__cell--num">172</span><span class="modlat-table__cell modlat-table__cell--num">2.05s</span><span class="modlat-table__cell modlat-table__cell--num">1.89s</span><span class="modlat-table__cell modlat-table__cell--num">3.39s</span><span class="modlat-table__cell modlat-table__cell--num">5.66s</span></div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">4:producer_agent</span><span class="modlat-table__cell modlat-table__cell--num">172</span><span class="modlat-table__cell modlat-table__cell--num">2.13s</span><span class="modlat-table__cell modlat-table__cell--num">1.98s</span><span class="modlat-table__cell modlat-table__cell--num">3.28s</span><span class="modlat-table__cell modlat-table__cell--num">4.20s</span></div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">5:give_final_diagnosis</span><span class="modlat-table__cell modlat-table__cell--num">172</span><span class="modlat-table__cell modlat-table__cell--num">5.30s</span><span class="modlat-table__cell modlat-table__cell--num">4.92s</span><span class="modlat-table__cell modlat-table__cell--num">8.09s</span><span class="modlat-table__cell modlat-table__cell--num">9.92s</span></div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">5:producer_agent</span><span class="modlat-table__cell modlat-table__cell--num">172</span><span class="modlat-table__cell modlat-table__cell--num">1.99s</span><span class="modlat-table__cell modlat-table__cell--num">1.79s</span><span class="modlat-table__cell modlat-table__cell--num">3.37s</span><span class="modlat-table__cell modlat-table__cell--num">4.23s</span></div>
                <div class="modlat-table__row"><span class="modlat-table__cell modlat-table__cell--label">judge:judge_agent</span><span class="modlat-table__cell modlat-table__cell--num">172</span><span class="modlat-table__cell modlat-table__cell--num">11.99s</span><span class="modlat-table__cell modlat-table__cell--num">11.95s</span><span class="modlat-table__cell modlat-table__cell--num">14.96s</span><span class="modlat-table__cell modlat-table__cell--num">21.26s</span></div>
              </div>
            </div><!-- /§2 -->

          </div><!-- /Module Latency tab -->
```

Notes on the chart block:

- Chart rows are pre-sorted descending by `p95` because that's the
  default active chip. If a different chip is later marked active,
  re-sort the rows in this block to match.
- The first row (`judge:judge_agent`) carries `is-hovered` to
  demonstrate the tooltip. Every other row is resting. Don't add
  `is-hovered` to multiple rows — only one shown at a time, this is
  the canonical pattern for these wireframes.
- Inline `style="--p50:X;--mean:M;--p95:Y;--max:Z;"` per row holds the
  seconds values. CSS does the width math against a 25s scale. Don't
  bake widths into the HTML.
- The chart's max scale (25s) is one tick above the largest observed
  `max` value (21.26s). If the data ever exceeds 25s, the scale will
  need to grow — note for future, no action now.
- Bar order top-to-bottom is `p50` → `mean` → `p95` → `max`, which
  matches the typical ascending order of those values for a
  right-skewed distribution. The tooltip `<dl>` follows the same
  order for consistency.

---

## 2. CSS additions

Append the following inside the trailing `<style>` block (the one
that starts with `body { background: #FFFFFF; }` and ends just
before `</style></head>`). Keep the existing rules in that block;
add these after the `.trendtile__axis` rule and before the `/* Tab
panels */` comment.

```css
  /* ---------- Module Latency · chart ---------- */
  .modlat__legend {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; color: #6B6B6B;
  }
  .modlat__legend .modlat__swatchlabel { margin-right: 8px; }
  .modlat__legend .modlat__swatchlabel:last-child { margin-right: 0; }
  .modlat__swatch {
    display: inline-block; width: 12px; height: 8px;
    border-radius: 1px; background: #2A2A2A;
  }
  .modlat__swatch--p50  { opacity: 1.0; }
  .modlat__swatch--mean { opacity: 1.0; }
  .modlat__swatch--p95  { opacity: 1.0; }
  .modlat__swatch--max  { opacity: 1.0; }
  /* All four swatches the same ink (flat token). The legend is a
     visual key for the row ordering p50/mean/p95/max — bar length
     carries the story, not bar colour. */

  .modlat__controls {
    display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
  }
  .modlat__controls-label {
    font-size: 11px; letter-spacing: 0.1em;
    text-transform: uppercase; color: #8A8A8A; font-weight: 600;
  }
  /* The existing .filterchips / .filterchip rules already handle
     the sort-by switcher styling; no overrides needed. */

  .modlat__axis {
    display: grid;
    grid-template-columns: 220px 1fr 60px;
    align-items: center;
    font-size: 10px; color: #9B9B9B;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    padding: 0 0 6px;
    border-bottom: 1px dashed #ECECEC;
    margin-bottom: 10px;
  }
  /* Tick labels sit in the bars column. Simplest layout: wrap the
     six spans in a flex row that fills column 2, with
     justify-content: space-between. */
  .modlat__axis {
    grid-template-columns: 220px 1fr 60px;
  }
  .modlat__axis > span {
    grid-column: 2;
    display: inline-flex; justify-content: space-between;
  }
  /* If the nth-child approach proves cleaner, replace the span set
     with a single flex container — six children, space-between. */

  .modlat__chart {
    display: flex; flex-direction: column; gap: 8px;
  }
  .modlat__row {
    position: relative;
    display: grid;
    grid-template-columns: 220px 1fr 60px;
    align-items: center; gap: 14px;
    padding: 6px 0;
    border-radius: 4px;
  }
  .modlat__row:hover,
  .modlat__row.is-hovered { background: #FAFAFA; }
  .modlat__rowlabel {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px; color: #2A2A2A;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .modlat__bars {
    display: flex; flex-direction: column; gap: 3px;
    min-width: 0;
  }
  .modlat__bar {
    position: relative;
    height: 7px;
    background: #ECECEC; border-radius: 2px;
    overflow: visible;
  }
  /* 7px (down from 8px in the 3-bar draft) keeps the row tight now
     that there are four stacked bars. Row content height is roughly
     4×7 + 3×3 = 37px plus 12px padding ≈ 49px. */
  .modlat__barfill {
    display: block; height: 100%;
    background: #2A2A2A; border-radius: 2px;
  }
  .modlat__bar--p50  .modlat__barfill { width: calc(var(--p50,  0) / 25 * 100%); }
  .modlat__bar--mean .modlat__barfill { width: calc(var(--mean, 0) / 25 * 100%); }
  .modlat__bar--p95  .modlat__barfill { width: calc(var(--p95,  0) / 25 * 100%); }
  .modlat__bar--max  .modlat__barfill { width: calc(var(--max,  0) / 25 * 100%); }
  .modlat__barval {
    position: absolute; left: 100%; top: 50%;
    transform: translate(6px, -50%);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 10px; color: #6B6B6B;
    white-space: nowrap;
  }
  .modlat__count {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11px; color: #6B6B6B; text-align: right;
  }

  /* Tooltip — shown on .modlat__row:hover or .is-hovered. */
  .modlat__tooltip {
    position: absolute;
    left: 240px; top: 100%;
    z-index: 5; margin-top: 4px;
    min-width: 200px;
    background: #2A2A2A; color: #FFFFFF;
    border-radius: 6px; padding: 10px 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.18);
    font-size: 11px;
    display: none;
  }
  .modlat__row.is-hovered .modlat__tooltip,
  .modlat__row:hover .modlat__tooltip { display: block; }
  .modlat__tooltip-title {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11px; font-weight: 600;
    margin-bottom: 6px; color: #FFFFFF;
  }
  .modlat__tooltip-grid {
    display: grid; grid-template-columns: auto 1fr;
    gap: 2px 12px; margin: 0;
  }
  .modlat__tooltip-grid dt {
    font-size: 10px; letter-spacing: 0.08em;
    text-transform: uppercase; color: #BFBFBF;
  }
  .modlat__tooltip-grid dd {
    margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 11px; color: #FFFFFF; text-align: right;
  }

  /* ---------- Module Latency · data table ---------- */
  .modlat-table {
    border: 1px solid #E5E5E5; border-radius: 8px;
    background: #FFFFFF; overflow: hidden;
  }
  .modlat-table__head, .modlat-table__row {
    display: grid;
    grid-template-columns: 1fr 80px 80px 80px 80px 80px;
    align-items: center; gap: 12px;
    padding: 10px 16px; border-bottom: 1px solid #ECECEC;
  }
  .modlat-table__head {
    background: #FAFAFA; color: #6B6B6B;
    font-size: 10px; letter-spacing: 0.08em;
    text-transform: uppercase; font-weight: 600;
  }
  .modlat-table__row:last-child { border-bottom: 0; }
  .modlat-table__cell--label {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px; color: #2A2A2A;
  }
  .modlat-table__cell--num {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px; color: #2A2A2A; text-align: right;
  }
  .modlat-table__head .modlat-table__cell--num { text-align: right; }
  .modlat-table__sort {
    margin-left: 4px; font-size: 9px; color: #BFBFBF;
  }
  .modlat-table__sort.is-active { color: #2A2A2A; }
```

Notes on the CSS:

- All four bar tiers (`p50`, `mean`, `p95`, `max`) share
  `background: #2A2A2A` — the "flat token" Jack signed off on. The
  legend swatches all carry `opacity: 1.0` for the same reason; the
  swatches are kept as four nodes so that if a future iteration
  wants to differentiate the tiers visually, it's a one-line change
  per swatch rather than a markup rewrite.
- Bar widths derive from the row's inline `--p50/--mean/--p95/--max`
  custom properties via `calc(... / 25 * 100%)`. The 25s denominator
  is the chart's scale max — change in one place if the scale grows.
- The axis row's six tick labels sit inside a single flex container
  in column 2 with `justify-content: space-between`. If subpixel
  drift between bars and ticks becomes visible, switch to absolute
  positioning at 0/20/40/60/80/100% of the bars column.
- The tooltip is dark-on-light (white text on `#2A2A2A`) to read
  cleanly over the `.section` card background and the alternating
  row highlight. Matches the visual weight of `.btn--primary`.

---

## 3. No JS wiring

Sort switching and table-column sorting are documented above as the
intended interaction, but no JS is wired in this pass. The chart
renders pre-sorted by `p95` (matching the default active chip); the
table renders pre-sorted by `step:module` ascending (matching the
default active column header arrow). Other chips and column headers
are rendered as plain spans without click handlers — same convention
as the tab switcher's earlier states.

If/when Jack greenlights interactivity, the wiring is small: read
the active chip's text, read each row's `--p50/--mean/--p95/--max`,
sort rows by that key descending, re-attach to `.modlat__chart`.
Same shape for the table. Out of scope for this spec.
