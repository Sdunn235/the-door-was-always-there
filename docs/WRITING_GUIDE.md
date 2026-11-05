# Writing Guide

How to write the game's content. Everything a player reads lives in JSON files, so you never touch engine code to change the story. Field-by-field details are in [SCENE_SCHEMA.md](SCENE_SCHEMA.md); safety rules are in [CONTENT_REVIEW.md](CONTENT_REVIEW.md).

> The content files arrive in **Phase 3**. This guide describes how they'll work so you can start drafting in any text editor now.

## The workflow

1. **Pick a scene** from `src/story/en/case01/scenes.json` (or `shared/argument.json`).
2. **Read its brief** (`authoring.brief`). It says the scene's job, the rubric item it serves, and its limits. The brief tells you *what the scene must do*, never what to say.
3. Set `authoring.status` to `"draft"`.
4. **Replace each `[PLACEHOLDER …]`** with your own words.
5. **Facts go in claims, not scenes.** If a line states a number, a research finding, or what an expert said, write it in `src/research/claims.json` and put `{ "claim": "CLM-…" }` in the scene.
6. Run the checks: `npm run validate`, then `npm run dev` to play it.
7. Go through [CONTENT_REVIEW.md](CONTENT_REVIEW.md), then set `authoring.status` to `"final"`.

## JSON survival tips

JSON is strict. Most errors come from these:

| Problem | Fix |
|---|---|
| A double quote inside text ends the string early | Use curly quotes “like this” or single quotes 'like this' inside text, or escape: `\"` |
| Missing comma between items | Every item in a list, and every field in an object, needs a comma after it, **except the last** |
| Extra comma after the last item | Remove it |
| Apostrophes | Fine as-is: `"he's"` |
| Line breaks inside text | Not allowed. Split into two segments instead |

VS Code underlines JSON mistakes in red, and `npm run validate` names the file and the scene id.

## Writing rules of thumb

- **Short lines.** Dialogue is 1–3 sentences per segment. A scene is about 4–8 segments.
- **Plain words.** Your audience is nontechnical. Explain a term the first time (telehealth, systematic review).
- **Observation vs. inference.** Tag what a witness *saw* as `"tag": "observation"` and what they *guess* as `"tag": "inference"`. The game labels both.
- **No diagnosis.** Characters describe behavior, never a condition.
- **Keep ids, change words.** Ids like `c1.interview.coworker` or `EV-flyer` must not change, because other files point to them. Titles, labels, and text can change freely.
- **Locked choices need a hint.** If a choice has `requires`, write a `lockedHint` that tells the player what to go find, not just "locked."

## Claims: paraphrase or quote

| Mode | When | Rule |
|---|---|---|
| `paraphrase` | Most of the time | Your own sentence and your own structure. Cite it. |
| `quote` | When the exact words matter (e.g. an expert's statement) | Copy **exactly**, put it in quotation marks, and add `locator`: `p. 140` or `para. 4` |

After reading the original source, set the claim's `status` to `"shawn-verified"` ([RESEARCH_STATUS.md](RESEARCH_STATUS.md) has the steps).

## What placeholder text looks like

Claude's placeholders are always **bracketed** and never polished prose, so they can't pass as finished writing:

```json
{ "speaker": "coworker", "tag": "observation", "text": "[PLACEHOLDER — one thing she saw him do]" }
```

`npm run validate -- --release` lists every one that's left. **The release check must pass before submission.**

## Asking Claude for help on content

Allowed (DECISIONS D-03): writing briefs, finding candidate sources, reviewing your drafts (Claude flags the issue and the rule; you fix it), and APA checks. Not allowed: Claude writing the final story, dialogue, or argument text.
