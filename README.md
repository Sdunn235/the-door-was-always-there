# The Door Was Always There

A short choose-your-own-adventure detective game that serves as a **persuasive proposal** for WCTC Technical Reporting (801-197). It explores barriers that may keep men in Milwaukee County from seeking mental-health support. The game is the medium. The argument, evidence, and APA citations are the assignment.

> **Status:** Playable. The game runs start to finish; the scene text is still `[PLACEHOLDER]` with a writing brief per scene, waiting on the author. All characters are fictional.

## Write the story

All the words live in **`src/content/story.js`**. Each scene has a `brief` telling you what it must do and which source to cite. Replace each `[PLACEHOLDER ...]` with your own text, then:

```powershell
npm run dev            # see it live while you write
npm run placeholders   # lists what's left; must say 0 before handing in
npm test               # checks links, citations, and order
```

## Run it

Needs Node.js 22.18+ or 24.12+.

```powershell
npm install          # first time only
npm run dev          # local dev server, opens at the URL it prints
npm test             # run the test suites
```

## Build it

```powershell
npm run build:single # -> dist-single/the-door-was-always-there.html  (ONE file, plays offline by double-click)
npm run build        # -> dist/  (normal multi-file site, for optional hosting later)
```

**To hand to the teacher:** send `dist-single/the-door-was-always-there.html`. It needs no install and no internet. Double-click it to open it in any modern browser.

## Project docs

| Doc | What it's for |
|---|---|
| [docs/DECISIONS.md](docs/DECISIONS.md) | Every decision, plus the list **waiting on Shawn** |
| [docs/RUBRIC_TRACE.md](docs/RUBRIC_TRACE.md) | All 10 grading criteria → scene → check → status |
| [docs/RESEARCH_STATUS.md](docs/RESEARCH_STATUS.md) | Sources, what each can support, gaps, how to verify |
| [docs/WRITING_GUIDE.md](docs/WRITING_GUIDE.md) | How to write the game's content |
| [docs/CONTENT_REVIEW.md](docs/CONTENT_REVIEW.md) | Safe-messaging and content checklist |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the game is built |
| [docs/SCENE_SCHEMA.md](docs/SCENE_SCHEMA.md) | Content file format |
| [docs/REUSE_AUDIT.md](docs/REUSE_AUDIT.md) | What was reused from earlier projects |
| [docs/TESTING.md](docs/TESTING.md) | Manual test steps |
| [CONTRIBUTIONS.md](CONTRIBUTIONS.md) | Who made what |
| [BACKLOG.md](BACKLOG.md) · [CHANGELOG.md](CHANGELOG.md) | What's next · what changed |
