# Rubric Trace

Every grading criterion mapped to where it lives in the game, what mechanic supports it, what automatically checks it, and its current status. Update the **Status** column as work lands.

> **Point values come from the handoff's summary of the rubric (total 75).** Confirm them against the real rubric on the course site (DECISIONS N-09).

**Status key:** 🟢 ready · 🟡 structure ready, Shawn's content pending · 🔴 blocked on a decision or research

| # | Criterion | Pts | Where (scenes) | Mechanic | Automated check | Status |
|---|---|---|---|---|---|---|
| 1 | **Problem identification** | 8 | `c1.brief` (story frame) → `c1.briefing.county` (the community problem stated plainly) → `closing.report` (restated) | The briefing is required before the proposal unlocks | `content.test`: indirect order | 🟡 Wording uses the share framing (P-01) |
| 2 | **Evidence of the problem** | 10 | `c1.briefing.county`: CLM-01 statistic (SRC-01), CLM-02 expert testimony (SRC-02, Dr. Ben Weston, Chief Health Policy Advisor), CLM-03 causes from research (SRC-03), plus a visible research-gap box | Claims only through claim ids; badges on every one | `citations.test`; `--release` fails on unverified claims | 🟡 3 sources assistant-checked; **no Milwaukee data yet on men's barriers** |
| 3 | **Solution statement** | 8 | `arg.proposal` (PROVISIONAL banner): audience, venue, who runs it, effort/cost, voluntary, measurable goals, privacy | Unlocks only after the county briefing | `--release` fails while slots are placeholders | 🔴 **Solution not chosen (N-05)** |
| 4 | **Evidence the solution works** | 10 | `arg.proposal`: "tried elsewhere" note | Same claim/badge system | `citations.test` | 🔴 **Thin.** SRC-04 (Man Therapy RCT) found both groups improved, with no between-group difference. LEAD-05/06 unverified. |
| 5 | **Citations** | 6 | Inline CitationBadge wherever a claim appears; **References** view (separate, alphabetical, double-spaced, hanging indent, blue active links, printable) | Claim → source lookup; print CSS | `citations.test`: every claim → source; every reference cited and every citation listed; alphabetical; years match; ≥ 2 sources ≤ 5 years old; no Wikipedia | 🟡 APA strings to be hand-checked by Shawn |
| 6 | **Counterargument** | 5 | `arg.objection`: a skeptical administrator raises "services already exist; men can choose" (Shawn's planning answer #1) | Requires `visited: arg.proposal`, so it can't appear before the solution | `content.test`: order | 🟡 Wording pending |
| 7 | **Refutation** | 5 | `arg.objection` (second half) | Supported by SRC-02 (affordable access), SRC-03 (barriers), and the flyer scene (generic awareness isn't enough) | `citations.test` | 🔴 Wording needed (N-06); must acknowledge agency |
| 8 | **Summary** | 5 | `closing.report`: recap of problem, evidence, solution, objection, refutation | Requires `visited: arg.objection` | `content.test`: order + reachability | 🟡 Slots ready |
| 9 | **Memorable close** | 3 | `closing.report` final line + the `c1.door` story payoff | n/a | n/a | 🔴 Needs Shawn (N-07) |
| 10 | **Presentation quality** | 15 | The whole game: walkable hub, visuals, readable plain language, accessibility, working links, polish | Canvas hub, NearbyList, text-only mode, themes | `a11y.test`, `build:single` offline check, manual [TESTING.md](TESTING.md) | 🟡 Delivery proven (Phase 0). Art is placeholder until N-12. |

**Points at risk right now:** solution statement + solution evidence = **18 of 75** (🔴), plus refutation and close = 8 more. These need research and decisions, not code.

## Assignment requirements (from the assignment sheet)

| Requirement | How it's met | Status |
|---|---|---|
| Problem in the **local community**, not national | Milwaukee County (SRC-01, SRC-02 are local). SRC-03 is supporting research on causes, not the local proof. | 🟢 |
| Prove the problem exists (one example isn't proof) | Several evidence types: statistic + expert testimony + research review | 🟡 |
| Suggest **causes** | Barriers: belief (self-reliance, fear of judgment, from SRC-03) and material (affordable care, from SRC-02) | 🟡 |
| A logical, viable solution | `arg.proposal`, including constraints (cost, staffing, space) | 🔴 N-05 |
| **Indirect approach** | Engine-enforced order: story → evidence → solution → objection → refutation → summary | 🟢 (P-03) |
| Present **both sides** | Objection + refutation, plus honest limitations on every source (e.g. SRC-04's mixed result) | 🟡 |
| **≥ 2 current sources** (≤ 5 years old → published Nov 2021 or later) | Candidates are dated 2022–2026 | 🟡 pending Shawn's verification |
| In-text citations + **separate, double-spaced Reference page** | CitationBadge + References view + print CSS | 🟡 Phase 6 |
| APA format; DOI links active; no "Retrieved from" | Hand-checked `apaReference` strings ([APA Guide](APA%20Guide%20-%20Recap.md)) | 🟡 |
| **No Wikipedia** | `citations.test` rejects wikipedia.org | 🟡 Phase 3 |
| Expert testimony names the person and job title | Dr. Ben Weston, Chief Health Policy Advisor, Milwaukee County (via WPR) | 🟡 confirm wording |
| Nontechnical audience | Plain language ([WRITING_GUIDE.md](WRITING_GUIDE.md)); terms explained in context | 🟡 |
| Constraints (financial, space, staffing) | Proposal slots for effort/cost and who runs it | 🔴 N-05 |
| Creative format, not a paper | A game | 🟢 |
| Planning Guide completed | Submitted (awaiting grade) | 🟢 |
