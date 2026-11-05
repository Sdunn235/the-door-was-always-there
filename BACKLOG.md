# Backlog

Everything the game could still use, in one place. When an item is done, it moves to **Done** and gets a line in `CHANGELOG.md`.

## How to use it

- **Add:** put a new row at the bottom of **Inbox** with the next number (B-31, B-32...). A rough note is fine.
- **Pick:** move a row up to **Now** when we start it. Keep **Now** to one or two items.
- **Organize:** move rows between **Next** and **Later** to set the order. The top of each list goes first.
- **Done:** move the row to **Done**, add the date, and write its changelog line.

**Size:** S = under an hour · M = one or two hours · L = an evening or more

**Kind:** engine · world · ui · content · research · test · docs · bug · cleanup · feature

**Level:** the layer it lives in (engine · world · research · ui · content · docs). **Owner** in Notes: *Shawn* (content, research, decisions) or *Claude* (code, tooling).

---

## Now

| # | Item | Kind | Level | Size | Notes |
|---|---|---|---|---|---|
| B-02 | Phase 2: kernel, Commands, modes, conditions, effects, case log | engine | engine | L | Claude. Pure JS, no DOM. `engine.test.js` |

## Next

| # | Item | Kind | Level | Size | Notes |
|---|---|---|---|---|---|
| B-03 | Phase 2: map grid, walker, interactables, barrier walls | world | world | M | Claude. `world.test.js` |
| B-04 | Phase 2: boundary test (engine/world/research never import UI) | test | engine | S | Claude |
| B-05 | Phase 3: validator + `npm run validate` / `--release` | engine | engine | M | Claude |
| B-06 | Phase 3: seed research JSON from RESEARCH_STATUS | research | research | S | Claude seeds; statuses stay `assistant-checked` |
| B-07 | Phase 3: case 01 placeholder scenes + writing briefs + map CSV | content | content | M | Claude writes bracketed placeholders and briefs only |
| B-08 | Phase 3: content + citation tests (links, reachability, softlocks, order, APA cross-check, ≤ 5-year rule, no Wikipedia) | test | engine | M | Claude |

## Later

| # | Item | Kind | Level | Size | Notes |
|---|---|---|---|---|---|
| B-09 | Phase 4: views, toolbar, DialoguePanel, ChoiceList, NearbyList, CitationBadge, CaseNotes, settings, themes | ui | ui | L | Claude. First playable, no walking |
| B-10 | Phase 5: HubCanvas (tiles, shapes, movement, interaction, walls, door, NPC advancing, text-only mode) | ui | ui | L | Claude |
| B-11 | Phase 6: References / Credits / Resources views + print CSS | ui | ui | M | Claude. Credits include a **software** section (Vue, MIT) |
| B-12 | Phase 6: `build-credits.js`, `credits.test.js`, `a11y.test.js` | test | ui | M | Claude |
| B-13 | Phase 6: TESTING.md (manual checklist + walkthrough-video script), README, iteration report | docs | docs | M | Claude |

## Inbox

| # | Item | Kind | Level | Size | Notes |
|---|---|---|---|---|---|
| B-14 | Verify SRC-01: open the county page by hand; check for a final (non-draft) report | research | research | S | **Shawn** |
| B-15 | Verify SRC-02, SRC-03, SRC-04 against the originals (read the SRC-04 correction) | research | research | M | **Shawn** |
| B-16 | Find Milwaukee/WI evidence on men's barriers and service use | research | research | L | **Shawn** (Claude can find leads) |
| B-17 | Find outcome evidence for a solution (start with LEAD-05 Gilgoff, LEAD-06 Ohio) | research | research | L | **Shawn**. Biggest rubric risk |
| B-18 | Choose the pilot outreach proposal (N-05) | content | content | L | **Shawn** |
| B-20 | Confirm rubric point values (N-09) | docs | docs | S | **Shawn** |
| B-21 | Check the course AI-use policy; update CONTRIBUTIONS (N-13) | docs | docs | S | **Shawn** |
| B-23 | Verified local Milwaukee non-crisis resources | research | research | M | **Shawn** |
| B-24 | Pick art and font candidates; approve each license (N-12) | content | content | M | **Shawn** picks, Claude checks the license pages |
| B-25 | Optional expert interview (N-14) | research | research | L | **Shawn** |
| B-26 | Write case 01 scenes (replace placeholders) | content | content | L | **Shawn**. After B-07 |
| B-27 | Write the refutation (N-06) and memorable close (N-07) | content | content | M | **Shawn** |
| B-28 | Record the narrated walkthrough (backup submission) | docs | docs | M | **Shawn**. After the slice is final |
| B-29 | Replace the Phase 0 test page with the real app shell | cleanup | ui | S | Claude. Part of B-09 |
| B-30 | Optional hosting (GitHub Pages or itch.io), only if wanted (N-10) | feature | docs | S | **Shawn** decides |

## Done

| # | Item | Kind | Level | Size | Notes |
|---|---|---|---|---|---|
| B-00 | Phase 0: repo, scaffold, single-file offline build proven | feature | docs | M | 2026-11-03 · C0001 |
| B-01 | Phase 1: project docs | docs | docs | M | 2026-11-03 |
| B-19 | Decide title, student name, player role, setting (N-01 to N-04) | content | content | S | 2026-11-04 · D-15 to D-18 |
| B-22 | Decide on the instructor handouts in the repo (N-08) | docs | docs | S | 2026-11-04 · D-19 |
