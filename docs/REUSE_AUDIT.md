# Reuse Audit

**Date:** 2026-11-03 · **Purpose:** before writing game code, check Shawn's existing projects for choose-your-own-adventure (CYOA) mechanics, narrative systems, UI pieces, and architecture worth reusing. Record what was reused, what wasn't, and why.

## Summary

- **No existing project has a data-driven scene/choice graph.** The scene engine is new work.
- **TheForge is the design ancestor.** Shawn's .NET Frameworks final already plays like a CYOA: room → visible exits → choose → act. This game keeps that loop and moves the story *out of code and into data*.
- **LucentForge supplies the architecture patterns**: engine/view split, Commands, tile map, sprite sheets, event log. They're ported to JavaScript after the switch away from Python ([DECISIONS.md](DECISIONS.md) D-01).
- **TheForgeApp supplies the web conventions**: Vue Options API style, component layers, accessible focus handling, backlog/changelog formats.
- **Licensing is not a blocker.** None of the projects has a LICENSE file. Everything reused is Shawn's own work, and only ideas are taken from TheForge's GitHub Classroom starter.

## Detail

### 1. TheForge: design lineage (pattern, no code)
`School/WCTC/2025-2026/Net Frameworks/Module15/TheForge` · C# .NET 8, EF Core, Spectre.Console · Shawn's work on top of a GitHub Classroom starter (its `CONTRIBUTIONS.md` separates the two)

`PlayerLoop()` (`ConsoleRpg/Services/GameEngine.cs:2795`) is a CYOA loop: draw the room panel, list visible exits and objects, read a choice, act on it.

| TheForge | This game |
|---|---|
| Room + description | Scene |
| Visible `Door` (`d.IsVisible`) | Choice |
| `IsSecret` / `IsDiscovered` (revealed by inspecting) | Choice with `hiddenUntilMet`, revealed by evidence |
| `ILockable.RequiredKeyId` | Choice or interactable `requires` |
| `FindKeyLocation` hint after a failed unlock | `lockedHint` on a locked choice |
| NPC dialogue (`MiraDialogue` :3099, `GobbyDialogue` :3241) | Interview / conversation scenes |
| Options built from world state (`if (!cellarCleared) opts.Add(...)`) | `requires` conditions on choices |
| `_visitedRooms` | `visited` set in state |
| Mini-map | Case board (also the text alternative to a branching diagram) |

**Deliberately changed:**
- Dialogue lived in C# methods, chosen by `switch (npc.Name)` and matched with `pick.StartsWith("\"I'm here")`. That's fragile: change the wording and the branch breaks. Here, dialogue is data and choices are matched by **id**, never by text.
- `GameEngine.cs` (3,749 lines) mixes rules with about 860 direct `Console`/`AnsiConsole` calls. Here the engine can't touch the screen, and a test enforces it.
- `_cellarRewarded` was a session-only bool outside any model. Here all progress lives in one state object.
- `ErasmusDialogue` uses `Thread.Sleep` for dramatic timing. WCAG forbids forced timing, so reveals here are instant or player-advanced.

### 2. LucentForge: patterns ported to JavaScript
`Personal Project/LucentForge/Mechanics/` · Python 3.14 + pygame-ce · Shawn's own

| LucentForge source | Ported as | Notes |
|---|---|---|
| `runtime/README.md`: SimulationKernel / PresentationShell, the "Ripple Kernel" | `src/engine/kernel.js` + the Vue UI | UI sends Commands; kernel returns `{ state, events }` (≈ `SimFrame`). The engine never imports the UI (§RT7: no shared mutable flags). |
| `runtime/commands.py`: `Command` enum + `DEFAULT_KEY_BINDINGS` | `src/engine/commands.js` | Keys are data, so they're remappable, and tests can replay Commands with no keyboard. |
| `runtime/shell.py:41`: `RuntimeMode` enum | `src/engine/modes.js` | Named modes (TITLE, NOTICE, EXPLORE, SCENE, PAUSED…) instead of loose booleans |
| `world/tile_map.py`: CSV grid, `is_blocked`, `world_to_grid`, `_TILE_COLORS` | `src/world/mapGrid.js` + `src/ui/canvas/drawTiles.js` | Colored-tile fallback until licensed tiles exist |
| `renderer/sprite.py`: 3×4 directional sheet + colored-circle fallback | `src/ui/canvas/spriteSheet.js` | An independent implementation of generic sheet slicing. `sprite.py` notes its loader was "Ported from ReferenceFilesAndCode/Tower Defense/src/image_utils.py", so no code is copied from either. |
| `observation/event_log.py`: ring buffer of events | `src/engine/caseLog.js` | Becomes the detective's **case notes** |

**Not reused:**
- **The blocking modal sub-loops** (`while True:` in `pause_menu`, `save_menu`, `combat_scene`). Modes are state instead, and one render loop draws whatever the mode says.
- **needs / biochem / affinity / combat / OutcomeResolver**: unrelated mechanics. The handoff explicitly warns against borrowing them.
- **`assets/images/*` sprites**: fantasy art (goblins, demons) with **no license or credit record**. Not usable.

### 3. Smaller sources (pattern only)
| Source | Idea taken |
|---|---|
| `Intro to Java/Module2/The Maze` (Java Swing) | The outcome improves with what you gathered first (has the sword + talked to the sage). First-visit "sensory" description via `hasBeenEntered`. |
| `SoftwareArchitechture/FinalAssignment` (Java) | Observer `EventSystem`; tests that move the player and confirm the current room |
| `Personal Python Projects/iso_rpg_lab/build.py` | A build-time content validator (duplicate ids, missing references) |

### 4. TheForgeApp: conventions and small code
`School/WCTC/2026-2027/Java2/TheForgeApp` · Vue 3 + Vite · Shawn's own

- **Conventions:** Options API with a comment block per option; "the parent owns, the child shows" (props down, events up, never write a prop); every prop typed with `required`/`default`; every component declares `emits`; refs instead of page searches; atoms → molecules → organisms folders; data separate from views.
- **Accessibility patterns:** AppModal's focus discipline (`aria-labelledby` the title; focus leaves before hiding); `role="status"` / `role="alert"`; 44px touch targets; `:focus-visible` rings. Here we use native `<dialog>`, which handles focus trapping and Esc without Bootstrap.
- **Small code to adapt:** `ChoiceGroup.vue` (accessible choice buttons); `helpers/storage.js` (localStorage that fails quietly), used for **display settings only**.
- **Doc formats:** `BACKLOG.md` (Now / Next / Later / Inbox / Done) and `CHANGELOG.md` (Keep a Changelog).

### 5. Checked and not useful
LucentForge `data/rooms.json` (map regions, not story) · Gobby the Goblin (novel outline, no code) · Python Projects (Brick Breakaway, Tower Defense) · AdvPython labs · Intro to JavaScript Module 6 (jQuery members app) · Intro to C# · Intro to Web Development.
