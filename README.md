# The Strength to Speak (working title)

A short choose-your-own-adventure detective game that serves as a **persuasive proposal** for WCTC Technical Reporting (801-197). It explores barriers that may keep men in Milwaukee County from seeking mental-health support. The game is the medium. The argument, evidence, and APA citations are the assignment.

> **Status:** Phase 0 (setup + delivery test). The story, research, and proposed solution are works in progress. All cases are fictional composites.

## Run it

Needs Node.js 22.18+ or 24.12+.

```powershell
npm install          # first time only
npm run dev          # local dev server, opens at the URL it prints
npm test             # run the test suites
```

## Build it

```powershell
npm run build:single # -> dist-single/strength-to-speak.html  (ONE file, plays offline by double-click)
npm run build        # -> dist/  (normal multi-file site, for optional hosting later)
```

**To hand to the teacher:** send `dist-single/strength-to-speak.html`. It needs no install and no internet. Double-click it to open it in any modern browser.

## Project docs

`docs/` holds the assignment sources and, from Phase 1 on, the design docs (architecture, decisions, rubric trace, reuse audit).
