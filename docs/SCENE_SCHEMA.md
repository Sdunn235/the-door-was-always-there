# Content Schema

The contract for every content file. The engine (Phase 2) and validator (Phase 3) are built to this. **If a field here changes, the validator changes with it.** For how to *write* content, see [WRITING_GUIDE.md](WRITING_GUIDE.md).

## Conventions

- **Ids** are stable and never shown to the player. Rename the words freely, but keep the id.
  - Scenes: `<case>.<kind>.<name>` → `c1.interview.coworker`. Shared argument scenes: `arg.proposal`, `arg.objection`, `closing.report`.
  - Evidence `EV-…` · Tools `TOOL-…` · Barriers `BAR-…` · Claims `CLM-…` · Sources `SRC-…` · Resources `RES-…` · Interactables `IA-…`
- **Placeholders** are in square brackets: `[PLACEHOLDER — …]`. The validator counts them.
- **Authorship** is tracked on everything a player reads: `"authoring": { "status": "placeholder" | "draft" | "final", "brief": "…" }`.
  - `placeholder`: template text from Claude, in brackets. Never submit it.
  - `draft`: Shawn is writing it.
  - `final`: Shawn's finished words. Only `final` passes `--release`.

## Files

```
src/story/en/cases.json                 case index
src/story/en/case01/scenes.json         story scenes for case 01
src/story/en/case01/evidence.json       evidence items
src/story/en/case01/barriers.json       barriers
src/story/en/case01/tools.json          symbolic tools
src/story/en/shared/argument.json       proposal, objection, closing (shared by all cases)
src/maps/case01_commons.csv             tile grid
src/maps/case01_commons.map.json        legend, spawn, room description, interactables
src/research/sources.json               one row per publication
src/research/claims.json                one row per factual statement shown in the game
src/research/resources.json             help resources (988, local, non-crisis)
src/assets/manifest.json                one row per asset file
```

## cases.json
```json
{ "cases": [
  { "id": "case01", "title": "[PLACEHOLDER] Quiet withdrawal", "status": "in-progress",
    "start": "c1.brief", "hub": "c1.hub", "map": "case01_commons",
    "contentWarnings": ["mental-health-distress", "suicide-statistics"] },
  { "id": "case02", "title": "[Not started]", "status": "not-started" },
  { "id": "case03", "title": "[Not started]", "status": "not-started" }
] }
```
`status`: `not-started` (hidden from the menu) · `in-progress` · `ready`.

## Scene
```json
{
  "id": "c1.interview.coworker",
  "caseId": "case01",
  "kind": "interview",
  "title": "[PLACEHOLDER] Break room",
  "authoring": { "status": "placeholder", "brief": "One OBSERVATION and one INFERENCE from the coworker. No diagnosis. About 4 lines." },
  "fictional": true,
  "banner": null,
  "contentWarnings": ["mental-health-distress"],
  "skipTarget": "c1.hub",
  "body": [
    { "speaker": "coworker", "tag": "observation", "text": "[PLACEHOLDER — one thing she saw him do]" },
    { "speaker": "coworker", "tag": "inference",   "text": "[PLACEHOLDER — one guess she makes about why]" },
    { "claim": "CLM-03" },
    { "pending": "No Milwaukee data yet on why men skip care. Shown as a research-gap box." }
  ],
  "onEnter": [ { "op": "addEvidence", "id": "EV-observed-withdrawal" } ],
  "choices": [
    { "id": "ask-more", "label": "[PLACEHOLDER]", "target": "c1.hub",
      "requires": { "evidence": "EV-flyer" }, "hiddenUntilMet": false,
      "lockedHint": "[PLACEHOLDER — what you'd need to know first]",
      "effects": [ { "op": "setFlag", "id": "asked-coworker-twice" } ] }
  ]
}
```

| Field | Required | Meaning |
|---|---|---|
| `id` | ✓ | Unique scene id |
| `caseId` | ✓ | `case01`… or `shared` |
| `kind` | ✓ | `brief` · `hub` · `interview` · `evidence` · `briefing` · `conversation` · `barrier` · `outcome` · `proposal` · `objection` · `closing`. A `hub` scene puts the game in EXPLORE mode (the map). |
| `title` | ✓ | Heading shown to the player |
| `authoring` | ✓ | `status` + `brief` (see Conventions) |
| `fictional` | ✓ | `true` shows the "Fictional composite" tag. Briefing/argument scenes that present real evidence use `false`. |
| `banner` | | `"provisional"` shows the PROVISIONAL banner (used on the proposal until Shawn finalizes it) |
| `contentWarnings` | | Ids from the warning list below |
| `skipTarget` | if it has warnings | Where "Skip content" goes |
| `body` | ✓ | Segments, shown in order (see below) |
| `onEnter` | | Effects applied the first time the scene opens |
| `choices` | ✓ (≥ 1) | At least one way out. The toolbar always adds Back/Menu/Exit too. |

### Body segments (exactly one type each)
| Shape | Shown as |
|---|---|
| `{ "text", "speaker"?, "tag"? }` | Narrative or dialogue. `tag`: `observation` / `inference` adds a text label and icon. |
| `{ "claim": "CLM-01" }` | The claim's wording from `claims.json` plus its citation badge. **The only way a fact appears.** Unverified → "Research pending" box. |
| `{ "pending": "…" }` | A visible research-gap box. Honest about what isn't known yet. |

### Choice
| Field | Required | Meaning |
|---|---|---|
| `id` | ✓ | Unique within the scene. **The engine matches on this, never on the label.** |
| `label` | ✓ | Button text |
| `target` | ✓ | Scene id to open |
| `requires` | | Condition (below). Not met → button shown disabled with `lockedHint`, or hidden if `hiddenUntilMet` |
| `hiddenUntilMet` | | TheForge's secret-door idea: appears only once the condition is met |
| `lockedHint` | if `requires` | Why it's locked: "You need to …" |
| `effects` | | Applied when chosen, before moving |

## Conditions (one evaluator for everything)
```json
{ "evidence": "EV-flyer" }
{ "tool": "TOOL-reframe" }
{ "flag": "asked-coworker-twice" }
{ "barrier": "BAR-self-reliance", "is": "cleared" }     // present | understood | cleared
{ "visited": "c1.briefing.county" }
{ "all": [ …conditions ] }   { "any": [ … ] }   { "not": { … } }
```

## Effects (one reducer)
```json
{ "op": "addEvidence", "id": "EV-…" }
{ "op": "addTool", "id": "TOOL-…" }
{ "op": "setFlag", "id": "…", "value": true }
{ "op": "setBarrier", "id": "BAR-…", "to": "understood" }    // or "cleared"
{ "op": "moveNpc", "id": "student", "to": [9, 3] }
{ "op": "log", "text": "…", "tag": "observation" }
```
Every effect emits an event (`evidenceAdded`, `barrierCleared`…), which the UI announces.

## evidence.json · barriers.json · tools.json
```json
{ "id": "EV-flyer", "title": "[PLACEHOLDER]", "kind": "observation", "summary": "[PLACEHOLDER]",
  "authoring": { "status": "placeholder", "brief": "…" } }
```
`kind`: `observation` (seen or heard directly) · `inference` (someone's guess) · `document` (a thing found).

```json
{ "id": "BAR-self-reliance", "title": "[PLACEHOLDER] \"I should handle it alone\"", "type": "belief",
  "meaning": "[PLACEHOLDER — what this barrier is in real life]", "clearedBy": "TOOL-reframe",
  "authoring": { "status": "placeholder", "brief": "…" } }
```
`type`: `belief` (can be reframed) · `material` (time, money, transport). A material barrier has `"clearedBy": null` and is acknowledged, not "smashed."

```json
{ "id": "TOOL-reframe", "name": "[PLACEHOLDER] Hammer of Reframing",
  "represents": "[PLACEHOLDER — the real support-seeking skill this stands for]",
  "authoring": { "status": "placeholder", "brief": "…" } }
```

## Map: CSV + map JSON
`case01_commons.csv`: numbers, one row per line (LucentForge style). `0` floor, `1` wall, others per legend.

```json
{ "id": "case01_commons", "csv": "case01_commons.csv",
  "legend": { "0": "floor", "1": "wall", "2": "table" },
  "blocking": [1, 2],
  "spawn": { "col": 2, "row": 5, "facing": "up" },
  "description": "[PLACEHOLDER — one-paragraph text description of the room for text-only mode]",
  "interactables": [
    { "id": "IA-coworker", "kind": "npc", "label": "Talk to the coworker", "at": [6, 3],
      "scene": "c1.interview.coworker" },
    { "id": "IA-student", "kind": "npc", "label": "Talk to the student", "at": [10, 2],
      "scene": "c1.talk.student",
      "requires": { "all": [ { "evidence": "EV-flyer" }, { "evidence": "EV-observed-withdrawal" } ] },
      "lockedHint": "[PLACEHOLDER]" },
    { "id": "IA-wall-self-reliance", "kind": "barrier", "label": "Examine the wall", "at": [8, 2],
      "barrierId": "BAR-self-reliance", "scene": "c1.barrier.wall", "blocks": true },
    { "id": "IA-door", "kind": "door", "label": "The door", "at": [12, 2], "scene": "c1.door",
      "requires": { "barrier": "BAR-self-reliance", "is": "cleared" } }
  ] }
```
A `barrier` interactable blocks its tile until its barrier is `cleared`, then disappears from the map.

## research/sources.json
```json
{ "id": "SRC-03", "type": "journal",
  "authors": [ { "family": "Mokhwelepa", "initials": "L. W." }, { "family": "Sumbane", "initials": "G. O." } ],
  "year": 2025, "date": "2025-05-27",
  "title": "Men's mental health matters: The impact of traditional masculinity norms on men's willingness to seek mental health support; a systematic review of literature",
  "container": "American Journal of Men's Health", "volume": "19", "issue": "3", "pages": null,
  "articleNumber": "15579883251321670",
  "doi": "https://doi.org/10.1177/15579883251321670", "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12117241/",
  "accessed": "2026-11-03", "status": "assistant-checked",
  "apaReference": "Mokhwelepa, L. W., & Sumbane, G. O. (2025). Men's mental health matters: … *American Journal of Men's Health, 19*(3). https://doi.org/10.1177/15579883251321670",
  "apaInText": "(Mokhwelepa & Sumbane, 2025)",
  "notes": "Systematic review, 47 studies, 2000–2024. Not Milwaukee data. No intervention evaluated." }
```
- `type`: `journal` · `news` · `web` · `press-release` · `report` · `interview` (allowed for this class)
- `status`: `lead` → `assistant-checked` → **`shawn-verified`** (you read the original and confirmed it). Only `shawn-verified` passes `--release`.
- `apaReference` uses `*…*` for italics. It's **hand-checked** against `docs/APA Guide - Recap.md`, not generated by code.

## research/claims.json
```json
{ "id": "CLM-01", "sourceId": "SRC-01", "mode": "paraphrase",
  "text": "[PLACEHOLDER — Shawn's own wording of the male share of suicide deaths]",
  "locator": "para. 2",
  "population": "Suicide decedents, Milwaukee County", "location": "Milwaukee County, WI",
  "evidenceType": "statistic",
  "limitations": "Share of deaths, not a rate. Draft report.",
  "status": "assistant-checked",
  "authoring": { "status": "placeholder", "brief": "State the 76.1% → 80.3% share in plain words. Don't say 'rising rate'." } }
```
- `mode`: `paraphrase` (Shawn's own words, cited) or `quote` (exact words in quotation marks, with `locator` required: `p. #` or `para. #`)
- `evidenceType`: `statistic` · `fact` · `expert-testimony` · `example` (the assignment's four types)
- A claim passes `--release` only when its source is `shawn-verified` **and** its own `status` is `shawn-verified` **and** `authoring.status` is `final`.

## research/resources.json
```json
{ "id": "RES-988", "name": "988 Suicide & Crisis Lifeline", "kind": "crisis",
  "contact": "Call or text 988 · chat at chat.988lifeline.org", "url": "https://988lifeline.org/",
  "area": "United States", "note": "Free, confidential, 24/7. Also for emotional distress, not only crisis.",
  "verified": "2026-11-03", "status": "assistant-checked" }
```
`kind`: `crisis` · `non-crisis` · `local`. Unverified entries are hidden in release builds.

## assets/manifest.json
```json
{ "files": [
  { "file": "placeholders/tiles.svg", "title": "Placeholder tiles", "author": "Project-made",
    "sourceUrl": null, "artistUrl": null, "license": "Project-made", "licenseUrl": null,
    "downloaded": null, "attribution": "Placeholder art made for this project.", "edits": "none",
    "redistributionOk": true, "reason": "Stand-in until licensed art is approved", "status": "project-made" }
] }
```
`status`: `project-made` · `pending` (found, not approved) · `approved` (Shawn approved this exact asset page and license). Only `project-made` and `approved` pass `--release`.

## Content-warning ids
`mental-health-distress` · `suicide-statistics` · `suicide-mention` · `substance-use` · `relationship-abuse`. Only the first two are used in case 01. The others are reserved for cases 02/03, which need review before they're written.
