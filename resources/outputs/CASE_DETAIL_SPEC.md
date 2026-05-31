# Spec — 05 Case detail rework

Work on the current branch (`master`). Do not create a new branch.
Do not commit. Do not push. Jack will review the diff in VSCode.

Single file touched: `workspace/automated-testing/05-case-detail.html`.
Lo-fi wireframe under FR-386 — uses inline `<style>`, not the
design-system component CSS layer. Match the palette and primitives
already in this file (`.chip`, `.btn`, `.section`, `.panel`,
`.metastrip`, `.turn`, `.timeline`); do not pull in `tokens.css`.

The current page renders a six-tab strip
(`Conversation · Hypothesis evolution · Reasoning · Scores ·
Latency · Feedback`) and a two-column layout with the chat on the
left and three side-panels (scores, hypothesis evolution, self-
feedback) on the right, followed by full-width Reasoning and Latency
sections.

Collapse all of that into **three tabs** and reorganise the content
so reasoning, hypothesis evolution, and per-step latency move inside
the conversation flow at the step they belong to. The side column
goes away on the conversation tab; scores and module latency live on
the overview tab only.

---

## Context

A test case is one full SP↔chatbot dialogue replayed against the
production pipeline. Each chatbot turn is the output of a multi-
module pipeline (see `workspace/automated-testing/04-results.html`
Module Latency table for the full module roster — `0:greet_and_describe`,
`1:producer_agent`, `1:step1_transition`, `2:extract_and_collect_general`,
`2:producer_agent`, `2→3:formula_match`, `2→3:preprocess_farmer`,
`2→3:rerank_hypothesis`, `3:collect_clinical_evidences`,
`3:extract_and_update_hypothesis`, `3:producer_agent`,
`4:collect_treatment_evidences`, `4:collect_vaccine_evidences`,
`4:producer_agent`, `5:give_final_diagnosis`, `5:producer_agent`,
`judge:judge_agent`).

Testers come to this page to answer three questions, in this order:

1. Did this case pass? What's the verdict, and which modules were slow?
   → **Overview tab**.
2. Who was the bot talking to? What persona was this?
   → **Profile tab**.
3. *Why* did the bot say what it said? What did each module contribute,
   and where did the hypothesis shift?
   → **Conversation tab**.

Decisions already taken (don't reopen):

- Three tabs total. `Hypothesis evolution`, `Reasoning`, `Scores`,
  `Latency`, `Feedback` no longer exist as tabs.
- Reasoning is per-module, not per-pair-summary. The old
  "Reasoning trace" prose section is removed; reasoning surfaces
  inside each module's expanded row.
- Hypothesis evolution surfaces at the step it changed — inside the
  module that updated it — not as a separate timeline.
- Module latency on this page is the **simplified rail only**:
  `module · count · latency`. The full p50/p95/max breakdown lives on
  `04-results.html` and is not duplicated here.
- Default state for every module drawer is **collapsed**. The user
  opens what they want to read.
- The two-column `.convo-layout` (`1fr 360px`) goes away on the
  Conversation tab. Conversation takes full content width.

The detail head and meta strip at the top of the page stay where they
are — those are case-level context, not tab content.

---

## Tab strip

Order, left to right:

| Tab            | Count badge |
| -------------- | ----------- |
| Overview       | —           |
| Profile        | —           |
| Conversation   | turn count (e.g. `8`) |

`Overview` is the default active tab.

The existing `.tabs` / `.tabs__item` classes are reused.
The old `Hypothesis evolution`, `Reasoning`, `Scores`, `Latency`, and
`Feedback` items are removed from the markup.

---

## Overview tab

Two stacked `.section` cards. No side column.

### Section 1 — Label & scores

Header: `Label & scores`. Hint: `Per-case metrics vs. cohort baseline.`

Four-tile grid, full content width, equal columns. Each tile carries:

- Uppercase 10px label (`Accuracy`, `Fluency`, `Efficiency`, `Cost`).
- Large numeral (22–24px, weight 600).
- Thin progress bar beneath the numeral, filled in proportion to the
  metric (cost is filled inversely — cheaper = fuller bar — keep the
  same `.score__bar` rule as today's side panel).

A single-line verdict caption sits below the grid, e.g.
*"Reached correct disease (PRRS) in 3 retrieval turns. Path acceptable."*
Pull the current `.feedback` block's prose into this caption (12px,
muted color, no border). The bordered self-feedback panel goes away.

### Section 2 — Module latency

Header: `Module latency`. Hint: `Mean call time per module for this
case. Full p50/p95/max breakdown is on the run page.`

A 3-column table, full content width:

| Column   | Treatment |
| -------- | --------- |
| Module   | Monospaced, e.g. `3:extract_and_update_hypothesis`. Left-aligned. |
| Count    | Plain numeral, how many times the module ran in this case. Right-aligned. |
| Latency  | Mean in seconds with `s` suffix, monospaced. Right-aligned. |

Default sort: pipeline order (step:module ascending) — matches
`04-results.html` convention. Header row uses the same uppercase
tracked treatment as `.lat__head` today. Striping or muted rows are
not used; the row count (≤17) is small enough to read flat.

No chart, no sort switcher, no inline expand for percentiles. If a
tester wants the distribution shape they navigate to the run page.

---

## Profile tab

A single `.panel` containing a read-only mirror of the synthetic
profile view (the same shape as
`workspace/automated-testing/admin-test-profile-view.html`). Use the
identity card + behavioural parameters + seed prompt structure
already established there.

Three sub-sections inside the panel:

1. **Identity.** SP-ID (e.g. `SP-021`), species, stage, weight, brief
   history. Rendered as a definition-style two-column block (label
   left, value right, hairline between rows).
2. **Behaviour.** Verbosity, urgency, evasiveness — whatever
   parameters the profile carries. Render each as a labelled pill or
   small bar; match how `admin-test-profile-view.html` does it today.
3. **Seed prompt.** The opening utterance the SP is configured to
   send. Monospaced, soft-wrapped, in a `#FAFAFA` block.

This is a *snapshot* of the profile as configured at test time. No
"as-seen-during-this-run" overlay (which parameters fired) — we don't
log that data yet. If the profile schema on
`admin-test-profile-view.html` changes later, this tab inherits the
change.

A `View full profile →` link in the panel head deep-links to the
profile editor for this SP. No edit controls live on this tab.

---

## Conversation tab

This is the meat of the rework. The page primitive is a **pair** —
one SP utterance, then the bot's reply to it, with the module trace
that produced the reply *between* them.

### Pair structure

A pair has three slots, stacked vertically with a continuous left-
gutter timeline running through all of them:

```
[ SP bubble                              ]
        ┊  module-trace drawer           
[ Bot bubble                             ]
```

Existing `.turn` / `.turn--user` / `.turn--bot` / `.turn__bubble` /
`.turn__role` classes are reused for the bubbles. The two-column
grid `.turn { grid-template-columns: 90px 1fr; }` widens — the left
gutter is now the timeline rail and needs to host the module
trace too. Suggested rename: drop `.convo` and introduce
`.thread` as the outer container; pairs are `.thread__pair`. BEM
applies — `.thread__pair--final` for the last pair (which adds the
judgment drawer beneath the final bot bubble; see below).

The vertical timeline rail (single 1.5px hairline) runs from the
first SP bubble's top to the last bot bubble's bottom, continuous
through every drawer. Nodes sit on the rail (a small circle for
each turn, a small diamond for each module step inside a drawer).

### Module-trace drawer — collapsed

Between the SP bubble and the bot bubble of each pair, render a
single-row drawer affordance. Collapsed by default. The row reads as
a single horizontal strip on the timeline rail and shows:

- A chevron glyph (`›` rotated 90° when expanded).
- A short summary: *"Thought for {N}s · {M} modules"* — where
  *N* is total time spent inside the drawer for this pair, *M* is
  the count of module calls.
- Right-aligned token total: `Σ {tokens_in}/{tokens_out}`.

This affordance is muted (12px, `#6B6B6B`, no panel chrome). Click
toggles `.is-open` on the drawer. The pattern is borrowed from
OpenAI o1's "Thought for X seconds" and Anthropic extended-thinking
chrome — the conversation reads cleanly when collapsed, and the
trace opens inline when the tester wants it.

### Module-trace drawer — expanded

When `.is-open`, the drawer expands inline into a stack of module
rows, each a child of the drawer. The collapsed summary stays visible
at the top of the open drawer (so the tester can collapse again
without scrolling back). The drawer does not use card chrome — it's
the gutter rail plus indented content, not a bordered panel.

Each module row has the shape:

```
◇  step:module-name           ─── mean latency ─── ⟡ HYPOTH (if applicable)
   ───────────────────────────────────────────────────
   INPUT     { mono payload, soft-wrapped }
   REASONING The model's prose narration of what it's doing
             at this step. Two to four lines typical. Body
             weight, slightly muted color (#4A4A4A).
   OUTPUT    { mono payload, soft-wrapped }

   [ optional: hypothesis-update panel — see below ]
```

Three rows per module — `INPUT`, `REASONING`, `OUTPUT`. The row
labels are 10px uppercase tracked, sitting in a fixed-width left
gutter (`64–72px`). `INPUT` and `OUTPUT` bodies sit on a single
tonal step down (`#FAFAFA`), mono, soft-wrapped, no border. `REASONING`
sits on the white background, normal Poppins body, lightly demoted
color — this is the demoted-but-readable "thinking" surface
established by Claude / ChatGPT reasoning UIs.

Module name is monospaced (matches `04-results.html`). Latency is
mean time for *this specific call* (not the case mean), right-
aligned, mono.

The diamond glyph (`◇`) sits on the timeline rail. Hypothesis-
affecting modules use a filled diamond (`◆`) and a small `⟡ HYPOTH`
tag in the row header — the only visual differentiator between
module types. No module-type color rail; single ink throughout.

### Hypothesis-update payload

A module that updated the hypothesis (the two modules with this job
are `2→3:rerank_hypothesis` and `3:extract_and_update_hypothesis`)
renders an additional fourth row beneath OUTPUT, inside the module
row: a **hypothesis-update panel**.

The panel shows the probability distribution across candidate
diseases after this module ran:

- One sub-row per candidate (typically 3–5). Each sub-row has:
  - Candidate name (left-aligned, plain Poppins).
  - Stacked horizontal bar filled in proportion to confidence.
  - Confidence numeral (e.g. `0.88`, mono, right-aligned).
  - Delta vs. the previous hypothesis state (`▲ +0.33`, `▼ -0.28`,
    `▬ 0`). Color stays neutral — arrow glyph alone carries direction.
- The leading hypothesis bar uses solid `#2A2A2A`. All other bars use
  `#BFBFBF`. No second accent.
- Sort: descending by current confidence.

The previous-state baseline used for delta computation is the
hypothesis distribution **at the end of the previous hypothesis-
updating module** (or zeroes if this is the first one in the case).
The current `.timeline.hyp` block on the page is the source of truth
for the existing data — convert it into per-module distributions.
The standalone hypothesis-evolution side panel goes away.

### Judge as terminal drawer

`judge:judge_agent` runs once per case, after the final bot turn.
Render it as a **terminal drawer** beneath the last bot bubble —
same drawer chrome as the per-pair drawers, but with the collapsed
summary reading *"Judgment · {N}s"* (not *"Thought for…"*). When
expanded, it shows the judge's INPUT / REASONING / OUTPUT in the
same three-row module shape, plus a final verdict pill at the top
of the drawer (the chip currently rendered in the detail head:
`passed` / `failed` / `flagged`). This is where the cohort's pass/fail
call is justified, so the case naturally *ends* with the judge's
reasoning rather than the bot's last utterance.

Mark the parent pair as `.thread__pair--final` so the judgment
drawer renders. There is no judgment drawer on any other pair.

### Toolbar — view modes and filter

A small toolbar sits at the top of the conversation tab, above the
first SP bubble. It carries:

- A segmented control: `Compact` (default) / `Expanded`. Compact = all
  per-pair drawers collapsed. Expanded = all drawers (including the
  judge) open. State is page-local; no persistence required.
- A `Show modules ▾` dropdown with at minimum: `All` (default),
  `Hide producer_agent`, `Hide judge`, `Hide step transitions`. Hidden
  modules disappear from every drawer but the drawer's collapsed
  summary still counts them (so the count and total time remain
  truthful).

Reuse `.filterchip` / `.filterchip.is-active` patterns from the rest
of the page for the segmented control; the dropdown matches `.field`
+ `.chev` styling already in the file.

### Pair anchoring on long drawers

When an expanded drawer is taller than the viewport, the originating
SP bubble (the one that opened the drawer) sticks to the top of the
viewport while the user scrolls through the trace. The bot bubble
stays in document flow at the drawer's bottom — once it scrolls into
view, the SP bubble un-sticks. This keeps the question visible while
reading why-the-bot-answered-the-way-it-did.

Implementation hint: `position: sticky; top: {topbar-height + 8px};`
on `.thread__pair.is-open > .turn--user .turn__bubble`. Suppress when
the drawer is collapsed.

---

## Class-naming reminders

BEM throughout. Suggested new blocks (page-scoped, in this file's
inline `<style>`):

- `.thread`, `.thread__pair`, `.thread__pair--final`, `.thread__pair.is-open`
- `.drawer` (the module-trace drawer), `.drawer__summary`,
  `.drawer__body`, `.drawer.is-open`, `.drawer--judgment`
- `.mod` (single module row), `.mod__head`, `.mod__latency`,
  `.mod__hyptag`, `.mod__row` (one for INPUT/REASONING/OUTPUT),
  `.mod__row-label`, `.mod__row-body`, `.mod__row--mono`,
  `.mod__row--prose`
- `.hyp-update`, `.hyp-update__row`, `.hyp-update__name`,
  `.hyp-update__bar`, `.hyp-update__bar-fill`,
  `.hyp-update__bar-fill--lead`, `.hyp-update__num`,
  `.hyp-update__delta`, `.hyp-update__delta--up`,
  `.hyp-update__delta--down`, `.hyp-update__delta--flat`
- `.thread-toolbar`, `.thread-toolbar__seg`, `.thread-toolbar__filter`

State flags: `.is-open` on drawer and parent pair. Compact/expanded
mode lives as `data-mode="compact|expanded"` on `.thread` so a
single attribute switch can drive every drawer's resting state via
CSS.

The existing `.timeline` rules currently used by the right-column
hypothesis evolution can be retired — their logic moves into the
gutter rail plus the per-module diamonds.

---

## Data shape the wireframe needs

The wireframe is static. Populate one fully worked example case
(PRRS, same as today). Each pair needs:

- SP turn: text, `t+{n.n}s` timestamp.
- Bot turn: text, `t+{n.n}s` timestamp, total drawer latency, total
  tokens in/out, module list. Each module needs: step:module name,
  call latency, input payload (1–3 line mono blob, can be JSON-ish),
  reasoning text (2–4 lines, prose), output payload (1–3 line mono
  blob). For the two hypothesis modules, an additional list of
  `{candidate, confidence, delta}` triplets.
- The judge drawer needs: verdict pill, judge latency, input
  (`{case_summary, expected_disease}`-shape mock is fine), reasoning
  (2–4 lines), output (`{verdict: "passed", rationale: …}`-shape).

The current page already carries the conversation text and a
believable hypothesis sequence — reuse those. Module payloads can be
plausible mock JSON; the wireframe's job is to show the surface, not
to be exact.

---

## What goes away

- `.convo-layout` two-column grid.
- Side-column panels: scores (moves to Overview tab), hypothesis
  evolution (moves inline at hypothesis modules), self-feedback
  (collapses into a single verdict caption on Overview tab).
- `.section` for "Reasoning trace" — the standalone prose block.
- `.section` for "Latency breakdown · 8 steps" — the per-step table.
  Module latency on this page is the simplified rail on Overview.
- `Hypothesis evolution`, `Reasoning`, `Scores`, `Latency`, `Feedback`
  tab items.
- The `.timeline.hyp` ordered-list pattern is superseded by the
  inline hypothesis-update panels.

## What stays unchanged

- Sidebar (`.sidebar` group, brand, items).
- Topbar / breadcrumb (`.topbar`, `.crumb`).
- Detail head — chips, title, run meta line, export/flag/open-profile
  actions (`.detail-head`, `.detail-head__chips`, `.detail-head__actions`).
- Meta strip — six cells, six metrics (`.metastrip`).
- `.chip`, `.btn`, `.section`, `.panel`, `.turn` primitives reused
  by the new structure.

---

## CSS placement

All new rules go in the existing trailing `<style>` block in
`05-case-detail.html` (the one that currently holds `.convo-layout`,
`.panel`, `.scores-grid`, `.lat`, `.reasoning`). Remove the rules
backing the deleted markup as you go. Do not create new files; do
not import from `styles/`. This is still a wireframe, not a
design-system consumer.
