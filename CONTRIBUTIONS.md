# Contributions

Who made what in this project, so a reader can see exactly which parts are the author's own work.

> **Open item (DECISIONS N-13):** the assignment documents don't mention AI use. Shawn will confirm the course or instructor policy and update this page to match it before submission.

## Summary

| Area | Who | Notes |
|---|---|---|
| Topic, argument, and persuasive approach | **Shawn Dunn** | From his Persuasive Proposal Planning Guide |
| Story, dialogue, characters, scene text | **Shawn Dunn** | Every scene is tracked with `authoring.status`. Only Shawn's `final` text ships. |
| Proposal, counterargument, refutation, closing | **Shawn Dunn** | |
| Research: choosing, reading, and verifying sources; paraphrases and quotes | **Shawn Dunn** | Claude found some candidate sources (marked `lead`/`assistant-checked`); only sources Shawn read and verified (`shawn-verified`) are used. |
| Design direction and all project decisions | **Shawn Dunn** | Recorded in [docs/DECISIONS.md](docs/DECISIONS.md) |
| Game engine, UI code, tests, build tooling | **Claude** (Anthropic), via Claude Code, directed and reviewed by Shawn | Built phase by phase with review stops |
| Project docs (architecture, schema, checklists, this page) | **Claude**, reviewed by Shawn | |
| Placeholder text, templates, per-scene writing briefs | **Claude** | Always bracketed `[PLACEHOLDER …]`; the release check fails if any remain |
| Draft reviews and APA checks | **Claude** | Flags only; Shawn makes every fix |

## Prior work reused

Ideas and conventions from Shawn's earlier projects (TheForge, LucentForge, TheForgeApp, The Maze). No code was copied from third-party or instructor starter material. Details: [docs/REUSE_AUDIT.md](docs/REUSE_AUDIT.md).

## Third-party material

- **Art, audio, fonts:** none yet. Every future asset is listed in `src/assets/manifest.json` and on the in-game Credits screen with its creator and license.
- **Software:**

| Package | License | Ships in the game file? |
|---|---|---|
| Vue 3.5 | MIT | **Yes**, credited on the Credits screen |
| Vite 8, @vitejs/plugin-vue, vite-plugin-singlefile | MIT | No (build tools) |
| Vitest 5, jsdom, @vue/test-utils | MIT | No (test tools) |
| axe-core 4.14 | MPL-2.0 | No (test tool) |
