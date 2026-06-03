# Research — Premium-design standards applied to the Disease detail page

Research pass, not a build spec. Goal: catalogue the conventional
standards that make content-rich product pages read as *premium*, then
map each one onto the **main feature** of `disease-detail.html` so the
gaps are concrete and actionable. Every recommendation stays inside the
existing `--wf-*` token system and the static-HTML/CSS/JS constraint.

**Scope.** The *document column* only — identity hero, completeness
banner, Overview, clinical-form tabs, Disease stats, Symptoms clusters,
Management / Additional info prose, Version history, and the on-this-page
rail. Out of scope by request: the left **sidebar** and the topbar
**header islands** (breadcrumb / lang toggle / Sync / Edit / more-menu).

Primary file: `mockups/data-management/disease/disease-detail.html`
Styles:       `mockups/data-management/disease/wireframe.css`

---

## TL;DR — the six highest-leverage moves

In rough order of "premium-per-edit," all reversible and token-scoped:

1. **Decompress the type hierarchy + lift reading size.** Clinical prose
   is 14px and card titles are *also* 14px — body and headings whisper at
   the same volume. Bring prose to 15–16px and re-rank headings so each
   tier is unmistakable. This is the single biggest "wireframe → editorial"
   lever. *(§1)*
2. **Give cards real material.** Cards are pure-white `#fff` + a 1px sage
   hairline + a shadow that is effectively *off* (`--wf-shadow-1 = 0 1px 0
   /0.03`). They read as outlines, not paper. Warm the surface a hair
   toward cream and add one soft, layered, light-from-above shadow. *(§2)*
3. **Make the stat bars *mean* something.** The min–max range bars sit on
   an unlabelled track — the reader can't decode "where 40 °C sits." Add a
   legible domain (or a clinical reference band). Turns decoration into
   information. *(§4)*
4. **Add quiet body-system + intervention iconography.** The content has
   almost no icons; clinicians scan by body system and by intervention.
   One line-icon per Symptom cluster and per Management sub-head adds polish
   *and* real scan speed. *(§6)*
5. **Give the disease identity presence and the page rhythm.** Lead with a
   larger disease name; demote the meta; widen the gaps between major
   sections. *(§5, §7)*
6. **Fix de-emphasised label contrast.** `ink-4` (2.15:1) and `ink-3`
   (3.59:1) fail WCAG AA. De-emphasise with size/weight/space — not with
   illegible grey. *(§8)*

---

## What is already on-convention — do **not** regress these

The page is a competent, restrained "calm admin" design. Several things
are genuinely right and premium products do exactly the same; leave them:

- **Restrained palette.** Neutrals + one accent (forest) + semantic status
  (warn / danger / ok). Stripe, Linear and Vercel all use "surprisingly
  little colour — mostly neutrals plus one measured accent."【mantlr】
- **Warm-tinted greys.** The sage ink ramp is hue-tinted, not dead grey —
  exactly the Refactoring-UI "greys don't have to be neutral" move.【rui】
- **Controlled measure.** Prose capped at `72ch` sits in the 45–75ch
  sweet spot.【baymard】【rui】
- **Tabular numerals** on stats / tables / meters (`font-variant-numeric`).
- **Scrollspy + sticky TOC** with correct `scroll-margin-top` offset — the
  documented long-form pattern.【hbui】
- **Physical-metaphor menus** (`.wf-menu__panel` scales/translates up from
  its trigger) and **`prefers-reduced-motion`** support.
- **Clear clinical IA** — Overview → form tabs → stats → symptoms →
  management → version history mirrors the workflow-oriented structure of
  BMJ Best Practice / DynaMed (prevention → diagnosis → treatment).【iatrox】

The job is not to redesign; it's to raise the *finish*.

---

## The standards, applied

Format per dimension: **Convention** (what premium work does, cited) →
**Now** (what this page does, with file:line) → **Gap** → **Do this**
(token-scoped).

### §1 · Typographic hierarchy & reading experience  — *impact: HIGH*

**Convention.** Hierarchy comes from *three* levers — size, weight, colour
— not size alone; use 2–3 text colours and 2 weights, and "emphasise by
de-emphasising" secondary content.【rui】 For long-form reading the floor
is **16px body / 1.4–1.6 line-height** (18–20px often reads better), and
WCAG 2.2 wants line-height ≥1.5.【greadme】【baymard】 Premium products
treat the typeface as brand and let type "do the heavy lifting" once colour
is removed.【mantlr】【bejamas】

**Now.**
- Body 14px / 1.5 (`wireframe.css:96`); clinical prose 14px / 1.7
  (`:885`, colour `--wf-ink-2`, 10:1 — good).
- `.wf-card__title` 14px / 600 (`:325`) — **the same size as body.**
- `.wf-prose h4` (Vaccines / Treatment / Prevention) 13px / 600 (`:890`)
  — *smaller* than the body it heads. Hierarchy is inverted.
- Section labels 11px uppercase, `--wf-ink-4` (`:914`).
- Hero `<h1>` forced to 24px inline (`disease-detail.html:182`),
  overriding the 26px `.wf-page-title`.

**Gap.** The reading type is below the comfortable floor for careful
clinical narrative, and the heading scale is *compressed to near-flat*:
H1 24 → section-label 11 → card-title 14 ≈ body 14 → h4 13. A reader can't
feel the structure; everything murmurs at one volume. This is the
defining difference between "wireframe" and "premium editorial."

**Do this.**
- Lift clinical **prose to 15–16px**, line-height ~1.65, measure stays
  ≤72ch. (`.wf-prose`, `:885`.)
- Re-rank into four unmistakable tiers using **size + weight + colour**:
  - Disease name (hero H1): **28–32px**, weight 600, `--wf-ink`.
  - Section / card title: **16–18px**, 600, `--wf-ink`.
  - Sub-head `h4`: **≥ body (15–16px)**, 600, `--wf-ink` — never below body.
  - Body: 15–16px, `--wf-ink-2`.
- Keep section-label "eyebrows" small *but* legible (see §8): they are a
  tier marker, fine to keep uppercase + tracked, just not `ink-4`.

---

### §2 · Material, depth & elevation  — *impact: HIGH*

**Convention.** Premium UIs use *considered* depth: soft, layered,
light-from-above shadows; a small set (~5) of elevation tiers; and the
maxim **"reduce borders — use shadow / background / spacing to separate
instead."**【rui】 Warm neutrals (cream / beige) "look expensive" and let
one accent shine; cohesion of *material temperature* matters.【bejamas】【owdt】
Nested elements must read as *inside* their parent — avoid "ambiguous
depth" where a child looks like a sibling.【rui】

**Now.**
- `.wf-card` = `--wf-surface (#fff)` + `1px --wf-line` + `--wf-shadow-1`
  (`0 1px 0 rgba(20,30,20,0.03)`) — i.e. **elevation is effectively off**;
  cards are *outlined*, not raised. (`:310`.)
- Richer `--wf-shadow-2` / `-3` exist (`:75–76`) but content never uses them.
- The page floats on a warm *earthsky* wash (lime→forest over white) yet the
  cards are cold pure-white with cool hairlines — a temperature mismatch.
- Stat cards (`:810`) and symptom clusters (`:923`) carry the *same* 1px
  border as the card that contains them → parent and child read as peers.

**Gap.** Border-led + zero elevation + cold white over a warm wash = the
"wireframe" read. The most reliable "cheap vs. expensive" signal on the
whole page is sitting unused.

**Do this.**
- Warm `--wf-surface` a hair toward the DS cream (`#fffdf7`-ish) so the
  whole composition shares one temperature.
- Promote the primary cards (hero, Overview, stats, symptoms, version
  history) to **one soft, two-part shadow** (large soft drop + tight
  ambient) — model it on `--wf-shadow-2`, optionally with a 1px top rim
  highlight (the DS already ships `--glass-inset-light-soft` as a pattern).
  Soften or drop the hairline border once the shadow carries separation.
- Establish **two content tiers**: hero slightly more raised than body
  cards; make *nested* elements (stat cards, clusters) read as inset /
  flat-inside (e.g. `--wf-surface-2`, no drop shadow) so they sit *within*
  their parent rather than beside it.

---

### §3 · Colour & accent restraint with meaning  — *impact: MED-HIGH*

**Convention.** Mostly neutrals + **one measured accent**; colour should
carry *semantic* meaning, not decoration; never rely on colour alone —
pair with icon or shape.【mantlr】【rui】

**Now.** Palette discipline is good (see strengths). One dilution: forest
is doing quadruple duty — primary actions, active tab/TOC, *and* the data
fills in stat/range bars all use the same green, so the accent's "this is
actionable" meaning is slightly blurred by the decorative bars.

**Do this (light touch — don't break the restraint).**
- Reserve forest for **interactive / active** affordances.
- For the data fills (§4), use a quieter neutral or a *severity-graded*
  tint so colour encodes the data, not the brand.
- Keep pairing the incomplete signal with the `⚠` glyph, not colour alone
  (it already does — keep it).

---

### §4 · Data visualisation: stats & meters  — *impact: MED-HIGH*

**Convention.** Maximise the **data-ink ratio**; erase chartjunk and
redundant ink; "above all else, show data" and preserve graphical
integrity — a positional encoding must be *decodable*.【tufte】 Labels are
a last resort; de-emphasise them and let the value lead.【rui】

**Now.** Each stat = value (22px, `:820`) + a 6px pill track with an
absolutely-positioned fill at `left% / width%` (`:822`). Mortality
"5–20%", morbidity "90–100%", fever "40.0–41.5 °C" — but the **track has
no scale, no endpoints, no reference**. The bar *looks* quantitative while
giving the reader nothing to decode it against: it's closer to chartjunk
than data-ink, and the fever track's domain is meaningless without a
clinical baseline.

**Gap.** A positional chart that can't be read is decoration wearing a
chart's clothes — the opposite of premium clinical data-viz.

**Do this.**
- Anchor each track to a **legible domain**: 0–100% endpoints for
  mortality / morbidity; for fever show a **normal reference band**
  (e.g. shade 38.5–39.5 °C) so the elevated range reads *against* a
  baseline. That is genuinely premium *and* clinically meaningful.
- If a domain isn't meaningful for a given stat, **drop the bar** and let
  the typographic range stand (less ink, more clarity).
- Keep the value primary + tabular; keep the unit de-emphasised (already
  is, `:821`). Align comparable bars to a shared scale.

---

### §5 · Identity / hero presence  — *impact: MEDIUM*

**Convention.** Progressive disclosure — lead with the single most
important thing, with real presence, and demote everything else;
"emphasise by de-emphasising."【mantlr】【rui】

**Now.** The identity card packs name + status pill + 5 chips + 2
completeness meters + version select + 3 meta lines into a 2-column grid
(`disease-detail.html:178–233`), most of it at similar visual weight. The
24px name doesn't dominate the cluster.

**Do this.** Lead with the **disease name at 28–32px**; keep the
`Disease · PRRS` codename eyebrow above it; group status + chips as a
clearly secondary row; push version + created/updated/activated meta to
tertiary (smaller, `ink-3`, inside the existing left-border panel —
which is a good device). Optional Refactoring-UI "finishing touch": a
single accent top-border on the hero card — used *once*, sparingly.【rui】

---

### §6 · Iconography & visual encoding for scanning  — *impact: MEDIUM*

**Convention.** "Supercharge the defaults" — replace plain bullets/labels
with **contextual icons**; it raises polish and scan speed with near-zero
risk.【rui】 Clinical reference users scan by category, so visual anchors
pay off.【fuselab】

**Now.** The document column is almost icon-free. Symptom clusters
(Respiratory / Digestive / Neurological / Dermatology / Reproductive) and
Management sub-heads (Vaccines / Treatment / Recommendation / Prevention)
are tiny uppercase / plain-text labels, so the page scans as a wall of
near-identical boxes.

**Do this.** Add one small, consistent **line-icon** per body-system
cluster (lungs / gut / brain / skin / repro) and per management sub-head
(vaccine / treatment / prevention / recommendation), reusing the existing
24px `stroke-width:2` line-icon style already in the nav/topbar for
consistency. Keep them monochrome `--wf-ink-3`/`-2` so they anchor without
competing; reserve colour for status only.

---

### §7 · Whitespace, rhythm & layout  — *impact: MEDIUM*

**Convention.** Generous whitespace is a core "premium" signal — it makes
type/hierarchy do the work and "looks expensive even when simple."【bejamas】
Use a non-linear spacing scale (~25% steps) and keep **more space *around*
groups than *within* them** to avoid ambiguous grouping.【rui】

**Now.** The spacing scale (`--wf-s-1…8`, 4/8/12/16/24/32/48/64) is solid
and consistent. But section→section separation leans on the faint
`.wf-section-label` divider, and the overall column is fairly dense.

**Do this.** Increase the *rest* between major sections (e.g. the space
around section labels / between sibling cards from 24 → 32–40), so each
section gets a beat of silence before the next. Don't add density; add
breathing room. The reading column width is already well controlled.

---

### §8 · Microstates, motion & accessible de-emphasis  — *impact: MEDIUM*

**Convention.** "The microstates most teams treat as afterthoughts —
hover, focus, active, disabled, loading, **empty** — are where premium UI
shows up."【mantlr】 Motion should be purposeful: micro-interactions
100–200ms, transitions 200–500ms, ease-out entering / ease-in leaving;
define it in the system.【material】【epixs】 And de-emphasis must stay
*legible*: WCAG AA wants 4.5:1 for normal text (3:1 for large/bold).

**Now.**
- Motion is minimal: a 160ms tab-panel fade (`:804`), hover colour
  transitions, focus ring. The `.reveal` scroll-in pattern used elsewhere
  in the system isn't applied here.
- **Contrast (measured on white):** `ink` 15.7:1 ✓, `ink-2` 10.0:1 ✓,
  **`ink-3` 3.59:1 ✗**, **`ink-4` 2.15:1 ✗**. `ink-3` is used for stat /
  cluster labels and meta; `ink-4` for section labels, TOC title, notes —
  i.e. the de-emphasised text is below AA, some below even the large-text
  floor. Premium ≠ illegible.
- The "EN empty / — Not yet written —" state is the page's most important
  clinical signal but renders as a plain italic dash.

**Do this.**
- Apply the existing `.reveal` intersection-observer fade-in to major
  sections (subtle, ~200–250ms, ease-out, with the existing
  `cubic-bezier(0.4,0,0.2,1)`; `prefers-reduced-motion` already handled).
- Refine the TOC scrollspy: smooth-scroll + an active *pill* (or a
  thicker left-rule with a colour transition) instead of a plain colour
  swap; optional reading-progress indicator.
- **Raise the de-emphasised inks one stop** so labels/meta clear 4.5:1
  (e.g. retire `ink-4` for *text*, keep it for hairlines/dots; darken
  `ink-3`). Keep de-emphasis via *size / weight / spacing*, not low contrast.
- Give the empty/incomplete state a small designed treatment (muted card +
  the `⚠` icon + "Add English") — it's a core workflow moment, not an edge case.

---

## Prioritised roadmap

**P1 — structural finish (largest premium delta, lowest risk)**
- §1 Type hierarchy + reading size (prose 15–16px; 4-tier heading scale).
- §2 Material: warm surface + one soft layered shadow + nested-inset depth.
- §8 Fix de-emphasised label contrast to AA.

**P2 — information & polish**
- §4 Make stat/range bars decodable (domain + fever reference band).
- §6 Body-system + intervention iconography.
- §5 Hero presence + meta demotion.

**P3 — motion & state craft**
- §7 More section rhythm / whitespace.
- §8 `.reveal` scroll-in, refined TOC scrollspy, designed empty/incomplete state.

---

## Principles to honour (guardrails)

- **Stay inside the token system.** Express every change through `--wf-*`
  (and, where a value is missing, add a token rather than a magic number).
  This page deliberately uses the `wireframe.css` rail, not the full glass
  DS — match it.
- **Restraint over addition.** Premium here means *more finish, not more
  stuff*. Density is in behaviour and hierarchy, not in pixels.【mantlr】
- **Earn every high-contrast element** — it's a spotlight; if everything
  shouts, nothing leads.【clay】
- **Accessibility is part of premium**, not a tax: AA contrast, ≥16px
  hit/zoom targets, reduced-motion, never colour-only signalling.
- **Propagate to peers if a shared primitive changes.** `wireframe.css` is
  shared by the other disease screens (list / create / edit) — a token edit
  ripples; verify there before claiming done.

---

## Sources

- Refactoring UI — complete principles summary【rui】:
  https://howtoes.blog/2025/07/04/refactoring-ui-complete-book-summary-all-key-ideas/
- How Stripe, Linear & Vercel ship premium UI【mantlr】:
  https://mantlr.com/blog/stripe-linear-vercel-premium-ui
- Best font sizes for readability (16px / 1.5 / 50–75 CPL)【greadme】:
  https://www.greadme.com/blog/seo/best-font-sizes-for-readability-complete-guide
- Baymard — optimal line length / measure【baymard】:
  https://baymard.com/blog/line-length-readability
- Tufte data-ink ratio & chartjunk【tufte】:
  https://www.geeksforgeeks.org/data-visualization/mastering-tuftes-data-visualization-principles/
- Material Design 3 — easing & duration【material】:
  https://m3.material.io/styles/motion/easing-and-duration
- Motion UI & micro-interactions 2025【epixs】:
  https://epixs.in/motion-ui-micro-interactions-2025/
- Visual hierarchy in web design (2026)【clay】:
  https://clay.global/blog/web-design-guide/visual-hierarchy-web-design
- Minimalist colour & typography / "looks expensive"【bejamas】:
  https://bejamas.com/blog/minimalist-color-palette-and-typography-in-web-design
- Luxury colour palettes for web【owdt】:
  https://owdt.com/insight/luxury-color-palette/
- Healthcare UX best practices【fuselab】:
  https://fuselabcreative.com/healthcare-ux-design-best-practices-guide/
- Scrollspy / TOC long-form pattern【hbui】:
  https://hbui.dev/docs/components/scrollspy/
- Clinical reference tool comparison (BMJ / UpToDate / DynaMed)【iatrox】:
  https://www.iatrox.com/blog/dynamed-vs-uptodate-bmj-best-practice-clinicalkey-ai-iatrox-2025
