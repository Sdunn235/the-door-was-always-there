# Manual Testing

Checks a person has to do by hand, because automated tests can't see them. The full checklist (keyboard-only playthrough, NVDA, Lighthouse, 200% zoom, print preview, walkthrough-video script) arrives in **Phase 6**. Until then, this page holds the checks that already apply.

## Every build: offline single file
1. `npm run build:single`
2. Turn Wi-Fi off.
3. In File Explorer, double-click `dist-single/the-door-was-always-there.html`.
4. **Pass:** the page loads, the canvas shows the room, and the button works. Try a second browser (Edge and Chrome).

## Every change: automated suite
- `npm test`: all suites pass.
