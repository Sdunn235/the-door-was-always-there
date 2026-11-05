# Architecture

How the game is put together and why. The data format is in [SCENE_SCHEMA.md](SCENE_SCHEMA.md); the reasons behind each choice are in [DECISIONS.md](DECISIONS.md).

## The one rule

> **The engine decides. The UI shows.**

The UI never changes game state directly. It sends a **Command** ("move north", "choose `ask-more`", "go back"). The engine answers with the **new state** plus a list of **events** ("evidence added", "barrier cleared"). The UI draws the state and announces the events.

This is LucentForge's kernel/shell split (`Mechanics/runtime/README.md`), sized down for a turn-based story game. It's also the lesson from TheForge: its `GameEngine.cs` mixes rules and about 860 console calls, so the rules can't be tested or reused on their own.

```
   keyboard / mouse / NearbyList button
                 │
                 ▼
        ┌─────────────────┐     Command  { type: 'CHOOSE', id: 'ask-more' }
        │   UI (Vue)      │ ───────────────────────────────┐
        │ views, dialogs, │                                ▼
        │ canvas renderer │                    ┌──────────────────────┐
        │                 │ ◀───────────────── │  kernel.dispatch()   │
        └─────────────────┘  { state, events } │  (plain JS, no DOM)  │
           draws state,                        │  conditions.js       │
           announces events                    │  effects.js          │
           (aria-live)                         │  world/ (map, moves) │
                                               └──────────┬───────────┘
                                                          │ reads (never writes)
                                               ┌──────────▼───────────┐
                                               │  JSON content        │
                                               │  story · maps ·      │
                                               │  research · assets   │
                                               └──────────────────────┘
```

**Why it matters for this project:** the story, research, and solution will change many times. Because content is data and the engine is separate, rewriting a scene or swapping a source never touches engine code, and the tests show right away whether a change broke a link, locked the player in, or cited a source that doesn't exist.

## Layers

| Layer | Folder | Can import | Never imports | Job |
|---|---|---|---|---|
| Engine | `src/engine/` | `src/world/`, `src/research/` | Vue, DOM, canvas | Modes, Commands, conditions, effects, `dispatch`, case log, content validation |
| World | `src/world/` | none | Vue, DOM, canvas | Map grid from CSV, blocked tiles, grid movement, interactables, barrier walls |
| Research | `src/research/` | none | Vue, DOM, canvas | Look up sources and claims, report pending/unverified items |
| Content | `src/story/en/`, `src/maps/`, `src/research/*.json`, `src/assets/manifest.json` | n/a (data) | n/a | Everything the player reads. **Shawn-authored**; placeholders are labeled. |
| UI | `src/ui/` | everything above | n/a | Vue views and components, canvas drawing, settings, themes |

`tests/boundary.test.js` (Phase 2) fails the build if anything in `engine/`, `world/`, or `research/` imports Vue or touches `document`, `window`, or a canvas.

## State

One plain JSON object, created fresh on **Start** and thrown away on **Exit**:

```js
{
  mode: 'EXPLORE',            // TITLE · NOTICE · EXPLORE · SCENE · PAUSED · REFERENCES · CREDITS · RESOURCES · SETTINGS
  caseId: 'case01',
  sceneId: 'c1.hub',
  player: { col: 3, row: 4, facing: 'down' },
  npcs: { student: { col: 9, row: 2 } },
  evidence: ['EV-flyer'],     // ids, in the order found
  tools: ['TOOL-reframe'],
  flags: [],
  barriers: { 'BAR-self-reliance': 'understood' },   // present → understood → cleared
  visited: ['c1.brief', 'c1.hub'],
  history: [ /* previous states, for Back */ ],
  log: [ /* case-note entries */ ],
  settings: { skipSensitive: false }
}
```

- **Deterministic:** the same Commands from the same start always produce the same state. Tests can replay a whole playthrough without a browser.
- **Private by design:** progress is never saved, sent, or logged anywhere. Only *display* settings (text size, contrast, motion, text-only) go to localStorage. There are no analytics and no network calls.

## Modes and the screen

The kernel's `mode` decides what the UI shows. There are no blocking sub-loops (LucentForge's `while True:` menus aren't ported). Opening the pause menu just sets `mode: 'PAUSED'`, and closing it restores the previous mode.

Always reachable from every mode: **Menu/Pause · Resources · References · Credits · Skip content · Exit**.

## Walkable hub

- **World:** a CSV grid (LucentForge `tile_map.py` style) plus a map JSON listing interactables (NPCs, bulletin board, case board, briefing terminal, barrier walls, the door) with their tiles and the scenes they open.
- **Movement:** grid steps. Bumping a blocked tile or a standing barrier wall does nothing. Pressing **E/Enter** while facing an interactable opens its scene if its `requires` is met, or shows its `lockedHint`.
- **The metaphor (Shawn's original idea):** each barrier wall stands between the student and **the door**. When the player clears one, the wall comes off the map and the student moves closer. A material barrier (time, money) can't be hammered, and shows an honest "research pending" note instead.
- **Drawing:** plain Canvas 2D. Tiles are colored squares, and characters are colored shapes with **text labels** until licensed art is approved. The sprite loader already understands 3×4 directional sheets, so art can drop in later without code changes.

## Accessibility approach

The target is WCAG 2.2 AA where practical. We **do not claim certification**; a quick test can't prove compliance.

| Concern | How it's handled |
|---|---|
| Keyboard only | Every action is a real `<button>` or a key. **Tab always leaves the canvas** (no trap). Arrows/WASD move only while the canvas has focus. |
| Not everyone can or wants to walk | The **NearbyList** (HTML buttons: "Talk to coworker", "Inspect bulletin board") plays the whole game without moving. |
| Screen readers | Dialogue and choices are HTML. Focus moves to the scene heading on open. An `aria-live="polite"` region announces "Evidence added: …". The canvas has `role="img"` and a description of the room. **Text-only mode** hides the canvas entirely. |
| Color | Never the only signal: observation vs. inference, locked choices, and pending research all carry text labels. |
| Motion and timing | No timed interactions. Reduced motion follows the OS setting by default (instant transitions, no shake). |
| Reading | Text size setting, high-contrast theme, plain-language "what this represents in real life" line for every symbolic tool or barrier |
| Dialogs | Native `<dialog>` (focus trap + Esc built in). Focus returns to whatever opened it. |

## Citations and references

- Factual statements only appear through **claim ids** (`{ "claim": "CLM-01" }`). Their wording lives once, in `claims.json`, so a fact is written once and cited once.
- **CitationBadge:** an inline "(Kirwan, 2026)" button that opens the full APA reference, its limitations, and an active link.
- **References view:** alphabetical, double-spaced, hanging indent, blue active links, printable (`print.css`). This is the "separate Reference page" the instructor's APA guide requires.
- **Credits view:** art, fonts, and tools, generated from `assets/manifest.json`, so it can't drift from the files. Kept separate from academic references.

## Build and delivery

| Command | Output | Use |
|---|---|---|
| `npm run dev` | local server | development |
| `npm test` | Vitest results | all automated checks |
| `npm run build:single` | `dist-single/the-door-was-always-there.html` | **the file the teacher gets**: one self-contained page, plays offline by double-click |
| `npm run build` | `dist/` | optional hosting later, only with Shawn's approval |

Browsers won't load separate module scripts from `file://`, so the single-file build inlines all JS, CSS, and images. Phase 0 confirmed it runs from disk in Edge (Vue mounts, canvas draws).

## Testing strategy

| Suite (phase) | Proves |
|---|---|
| `engine.test.js` (2) | Commands produce the right state; gating; effects; Back/Restart; determinism |
| `world.test.js` (2) | Collision, facing, interact range, barrier walls blocking then clearing, NPC advancing |
| `boundary.test.js` (2) | Engine/world/research never import the UI |
| `content.test.js` (3) | No dangling scene links; every scene reachable; **no softlocks** (a search over the small state space); indirect-approach order (problem evidence → solution → objection → refutation → recap) |
| `citations.test.js` (3) | Every claim → an existing source; every reference cited in-game and every citation listed; alphabetical; years match; at least 2 sources ≤ 5 years old |
| `credits.test.js` (6) | Every asset file has a complete manifest entry; nothing third-party without approval |
| `a11y.test.js` (6) | axe-core structural checks on each view (labels, roles, landmarks); choices reachable by keyboard |
| Manual ([TESTING.md](TESTING.md), 6) | Keyboard-only playthrough, NVDA pass, Lighthouse, 200% zoom, print preview, offline double-click |

`npm run validate` reports pending items. `npm run validate -- --release` **fails** while any placeholder text, unverified claim, open proposal slot, or unapproved asset remains. That makes it the submission gate.
