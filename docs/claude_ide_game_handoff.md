# CLAUDE IDE HANDOFF — The Strength to Speak (working title)

**Status:** Early-stage framework/infrastructure build, not a final approved narrative or completed research project.  
**Project owner:** WCTC Technical Reporting student.  
**Date:** November 3, 2026.  
**Role for IDE agent:** Examine existing repositories and reusable code, propose a lean architecture, build a working vertical slice, and maintain an auditable research/asset trail.

## 1. Mission and intent

Build a **short, browser-accessible, choose-your-own-adventure detective/mystery experience** that functions as a **persuasive presentation** for a college Technical Reporting course. It explores barriers that may keep men in Milwaukee/Milwaukee County from seeking mental-health support despite the availability of services. It advocates **voluntary, targeted, approachable outreach for men**, including constructive models of healthy/positive masculinity, rather than simply adding more generic awareness advertising.

The story is the *medium of persuasion*. **Do not confuse building a game with the proposed public-health intervention:** the proposed solution is a feasible Milwaukee-area pilot outreach strategy; the game demonstrates why it may be worth trying. Exact intervention design is **provisional** until research supports it.

Respect the author's personal motivation but **do not use the author's private history, diagnosis, or personal disclosures** as game data, NPC backstory, README content, telemetry, or public materials. All cases must be fictional composites, clearly labeled as such.

## 2. Source of truth and assignment requirements

Read the supplied files in the workspace before generating final prose:
- `1. Persuasive Proposal Assignment - 2026.md` (assignment)
- `APA Guide - Recap.md` (instructor's citation conventions)
- `Pasted text(1).txt` (planning-guide questions and the author's answers)
- The user-supplied rubric in the originating conversation, if saved separately; otherwise request it from the user only if necessary for exact rubric encoding.

The assignment requires:
1. Establish and **prove a specific local problem** with multiple pieces of credible evidence (not an anecdote or a fictional case).
2. Explain plausible causes without overstating causation.
3. **Indirect persuasive approach:** problem and evidence first; then clearly reveal the proposed solution.
4. Demonstrate evidence supporting the solution, ideally including a program implemented elsewhere.
5. Explain at least one meaningful objection to the **solution**, then refute it with evidence/reasoning, **after** the solution is presented.
6. Recap problem, evidence, solution, counterargument, and refutation; finish memorably.
7. Use **at least two credible sources within the past five years**, with source citations accompanying claims and a separate **APA 7 reference page**; verify URLs and metadata; do not use Wikipedia.
8. Address constraints, feasibility, cost/staffing and nontechnical audience comprehension.
9. Final deliverable is creative/nontraditional. A local website or DIY game is permissible; it need not be hosted. The quality of interactive presentation matters.

Rubric point mapping (total **75**): Problem identification 8; evidence of problem 10; solution statement 8; solution evidence 10; citations 6; counterargument 5; refutation 5; summary 5; memorable close 3; presentation quality 15.

**Clarification:** The user's previous phrase 'ADA citations' appears to mean **APA citations**. Address both independently: **APA 7** for research references, and **ADA/WCAG 2.2 AA principles** for accessible UI. Do not claim formal ADA compliance from a quick test.

## 3. Planning-guide content (author's direction, not verified facts)

- Chosen **local community is Milwaukee**, not solely WCTC. WCTC may be the fictional student setting or an example of existing support, not the organization being accused of failing men.
- Working problem: expanded access including telehealth does not automatically eliminate social, cultural, or personal-belief barriers to help-seeking among men.
- Central advocacy: healthy masculinity can include emotional literacy, responsibility, support-seeking, and respect. Do not imply masculinity itself is pathological.
- User is **still researching the exact solution**; avoid presenting an untested intervention as proven to work.
- Preferred experience: an **investigator notices a change in a male student's behavior**; interviews witnesses, reviews credible evidence, identifies barriers, and acquires metaphorical tools to remove them. A hammer can break a 'self-doubt' obstacle; each thoughtfully handled obstacle brings the character closer to a symbolic door to support.
- The game must illustrate *possibility*, not claim counseling guarantees rescue or cures a condition. The player's investigation does not diagnose anyone.
- Counterarguments already developed: (a) services already exist; men can choose to use them, (b) responsibility for seeking care ultimately belongs to the individual. Refutations should acknowledge agency while arguing that making support easier to understand and approach is worthwhile.
- Author's initial concept also considered **three separate case files**: a suicide-related crisis, an abusive relationship/domestic dispute, and substance use/compulsive behavior. For MVP, implement **ONE sensitive, fictional composite case**, then provide a scalable three-case data model. Additional cases need careful review and sourcing before publication.

## 4. Two starting research sources supplied in the planning guide

**LOCAL PROBLEM EVIDENCE — Milwaukee County / Medical College of Wisconsin, May 27, 2026**
https://county.milwaukee.gov/EN/County-Executive/News/Milwaukee-County-Medical-College-of-Wisconsin-Release-Draft-Report-of-Suicide-Trends-Pre-Post-COVID-19
- The county reports proportions of suicide decedents who were male: **76.1%** pre-COVID (2002–March 2020) versus **80.3%** post-COVID (March 2020–2024).
- **CRITICAL:** These are shares of deaths, NOT automatically population-adjusted suicide rates or direct proof that suicide increased among men. Check source date, methods, comparison windows, denominators, draft status, and final updated report before using statistics.
- This supports the importance of male suicide within the local dataset; it **does not by itself prove why men avoided mental-health care**. Find distinct Milwaukee-specific evidence of barriers or label the gap honestly.

**RESEARCH ON POTENTIAL HELP-SEEKING BARRIERS — Mokhwelepa & Sumbane (2025)**
https://pmc.ncbi.nlm.nih.gov/articles/PMC12117241/
DOI: https://doi.org/10.1177/15579883251321670
- *Men's Mental Health Matters: The Impact of Traditional Masculinity Norms on Men's Willingness to Seek Mental Health Support; a Systematic Review of Literature*, *American Journal of Men's Health* (2025).
- Review discusses how certain traditional masculine norms may deter help-seeking. It is cross-context research, **not a Milwaukee prevalence estimate** and **not direct proof that any proposed outreach game works**.
- Verify final APA reference metadata in primary publication.

Research needed next:
- Recent Milwaukee County / Wisconsin local data on men's unmet mental-health needs, stigma, attitudes, access, suicide burden, and service utilization. Separate *availability* from *actual access* (cost, waiting, insurance, transport, trust, culture).
- Evaluated male-tailored outreach or help-seeking programs, preferably U.S. community-based interventions, and details about costs, results, and limitations.
- Verified local noncrisis mental-health resource(s) and crisis support resources with official URLs; avoid unsupported claims about eligibility or hours.
- Optional interviews with relevant local professionals, with permission and accurate attribution. Instructor explicitly permits interviews as class evidence, though this differs from standard APA personal-communication practice.

**Evidence controls:** create a `research/source_registry.json` or CSV with claim_id, exact claim, URL, publisher, author, date, location/population, evidence_type, limitations, status (unverified/verified), APA in-text string, full reference, access_date. Every factual game claim must point to a verified claim_id. Fail validation or show 'research pending' if unverified. Never fabricate interview quotations or research findings.

## 5. Narrative and game requirements

Working title: **The Strength to Speak** (subject to change). Mature-content notice before play; content warnings for suicidal crisis, abuse, and addiction if those paths are implemented. Do not sensationalize, romanticize, or graphically depict self-harm/violence. Include an always-available **skip content**, **pause/exit**, and **resources** link; do not trap players in bleak endings.

Suggested flow:
1. Case assignment: student circumstances, work/study demands, noticeable behavior change; NO ungrounded medical diagnosis.
2. Exploration hub: inspect fictional evidence, interview fictional witnesses, distinguish observation from inference.
3. Barrier discovery: shame, fear of judgment, false assumptions about counseling, rigid self-reliance, scheduling, money, prior treatment experience. Not all barriers are 'in the mind': material barriers must be acknowledged.
4. Symbolic mechanic: collected evidence unlocks tools ('Hammer of Reframing' breaks a self-doubt wall, etc.). Tools teach concrete support-seeking skills, not magical fixes. Each metaphor has explanatory alt text/accessible text mode.
5. Argument reveal: after showing the community problem with verified evidence, present one **specific and feasible** pilot outreach proposal, audience, venue, who runs it, estimated effort, voluntary nature, measurable goals, privacy constraints.
6. Objection/refutation: a credible skeptical administrator/community voice raises resource or participation objections; respond without straw-manning.
7. Closing report: claims sourced, optional branching reflection, concise summary and memorable ending; references/credits/resource links always accessible.

**Design important choices without false binary 'seek therapy and win / decline and fail'.** Outcomes should reflect informed choices, practical options, uncertainty, and agency. No player choice guarantees preventing suicide or abuse. In domestic abuse content, do not conflate victim and perpetrator; emphasize accountability and safety. Avoid conflating all mental illness with violence. Avoid diagnosing compulsive sexual behavior based on sexual activity alone.

## 6. Engineering approach — inspect before choosing

**First action:** inventory the current workspace and locate the author's prior CYOA game, Lucent Forge, Python game-development class projects, UI framework examples, and coding standards. Identify licenses and compatibility; reuse ideas/code **only after inspection**. Do not assume external directories or repos exist or silently borrow unrelated Lucent Forge mechanics.

Default recommendation if the repo has no strong alternative: **TypeScript + Vite + plain DOM/CSS**, content as schema-validated JSON/TS. No server, database, login, analytics, or AI calls. A web app is easier to distribute to a nontechnical class audience. Keep hosting optional and provide a local preview/build process. If the existing CYOA uses Python/Pygame and reuse is more valuable, compare tradeoffs and request user decision before major migration.

Required modules:
- `story/` scene graph, scene IDs, choices, prerequisites, branching, jump targets, narrative text, tags, content-warning metadata, localized text readiness.
- `engine/` deterministic state transitions, inventory/barrier state, event log, back/restart, progression validation; UI-independent.
- `ui/` responsive view, keyboard navigation, visible focus, reduced motion, readable text, high contrast, transcript/text-only option.
- `research/` verified claims and APA references, inline citation badges and reference/credits screen.
- `assets/` licensed third-party content and attribution ledger.
- `tests/` reachability, valid scene links, no softlocks, no claim without a source, accessibility smoke checks.
- `docs/` design decisions, content review checklist, bibliography, license credits, manual test instructions.

No automatic telemetry of mental-health responses. If anonymous testing is later desired, make it optional and collect no diagnoses, disclosures, identities, or behavioral profiling without an approved privacy plan. Do not store sensitive interview details.

## 7. Free third-party art/audio and attribution policy

Prefer **original work by identified artists** offered under clear licenses (e.g., CC BY 4.0, CC0, suitable creator licenses). Potential discovery directories include **OpenGameArt**, **itch.io free game assets**, **Kenney**, and **Wikimedia Commons**. These are **search starting points, not pre-cleared assets**. Some allow free download but restrict reuse or require attribution; some may have noncommercial/no-derivatives terms. Verify every individual asset's exact page, named author, license version, derivative and redistribution conditions, and attribution format before download or inclusion. Do not scrape copyrighted imagery merely because it is viewable online.

Maintain `assets/ASSET_CREDITS.md` and machine-readable `assets/manifest.json` with: filename, title, author, original work URL, artist page, license URL/version, downloaded date, attribution text, edits made, permission to redistribute, and reason for use. Place in-game credits and a visible credits page. Prefer keeping placeholders until a license is verified. No image generation necessary for MVP.

Avoid visual stereotypes equating men's distress with violence, and avoid sensational suicide imagery. Include descriptive alt text and appropriately licensed fonts/audio.

## 8. Accessibility and presentation-quality gate

Target WCAG 2.2 AA where practicable: semantic HTML, keyboard-only play, no keyboard traps, focus management, labels, contrast, scalable text, screen-reader navigation, motion reduction, audio captions/transcripts, no color-only evidence, accessible branching diagram alternatives, and non-timed interactions. Test using manual keyboard + screen reader checks and automated axe/Lighthouse where available. Do not claim legal certification.

Present evidence for a nontechnical audience. Cite claims on the scene where they appear (e.g., author-year) with a click-through full reference; separate APA 7 references page formatted for printing with hanging indents and double spacing. Credit art separately from academic references. Keep all external links functional and test them before final submission.

## 9. First development milestone (do now)

1. Inventory existing source and write `docs/REUSE_AUDIT.md` documenting reusable CYOA/Lucent Forge/class code.
2. Write `docs/ARCHITECTURE.md`, a scene data schema, and a rubric traceability matrix mapping **all ten criteria** to scenes/mechanics/tests.
3. Scaffold the playable application, entry/menu, content warning, case hub, one interview, one evidence examination, one symbolic barrier removal, a **clearly marked provisional** outreach proposal reveal, skeptical counterargument/refutation, closure, and references/credits/resources screens.
4. Keep fictional content and verified factual claims strictly separate; use placeholders for unverified local claims and for unlicensed assets.
5. Include sample tests for scene reachability, inventory gating, accurate citation placement, accessibility navigation, and credits completeness.
6. Document how to run locally, build static files, and package for teacher review; provide screenshots or quick demonstration instructions.
7. End the first iteration with a concise report: what was built, what was reused, unresolved decisions, sources/licenses requiring verification, and highest-risk gaps for the rubric.

**Do not write all three case stories, purchase assets, publish, or overbuild a simulation engine before the working vertical slice.** The author will iteratively revise argument, cases, and solution after reviewing evidence.
