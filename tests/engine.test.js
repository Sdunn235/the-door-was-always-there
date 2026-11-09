// The game rules, tested with a tiny made-up story (independent of the real one).
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { startGame, currentScene, choose, progress } from '../src/engine/play.js';

const mini = {
    start: 'a',
    scenes: {
        a: { title: 'A', note: 'note A', choices: [{ label: 'go', to: 'b' }] },
        x: { title: 'X', side: true, choices: [{ label: 'back', to: 'b' }] },
        b: { title: 'B', choices: [{ label: 'wrong', to: 'x' }, { label: 'on', to: 'c' }] },
        c: { title: 'C', note: 'note C', end: true, choices: [{ label: 'again', to: 'a' }] },
    },
};

describe('engine', function () {
    it('starts at the start scene with its note', function () {
        const s = startGame(mini);
        expect(currentScene(mini, s).title).toBe('A');
        expect(s.notes).toEqual(['note A']);
    });

    it('follows a choice and records the visit', function () {
        const s = choose(mini, startGame(mini), 'b');
        expect(s.sceneId).toBe('b');
        expect(s.visited).toEqual(['a', 'b']);
    });

    it('does not change the old state', function () {
        const s0 = startGame(mini);
        choose(mini, s0, 'b');
        expect(s0.sceneId).toBe('a');
    });

    it('refuses a target that is not a choice here', function () {
        expect(function () {
            choose(mini, startGame(mini), 'c');
        }).toThrow();
    });

    it('adds a note only the first time a scene is visited', function () {
        let s = choose(mini, startGame(mini), 'b');
        s = choose(mini, s, 'x');
        s = choose(mini, s, 'b');
        expect(s.notes).toEqual(['note A']);
    });

    it('the door never closes when the player tries a side branch', function () {
        let s = choose(mini, startGame(mini), 'b');
        const before = progress(mini, s);
        s = choose(mini, s, 'x');
        expect(progress(mini, s)).toBe(before);
        s = choose(mini, choose(mini, s, 'b'), 'c');
        expect(progress(mini, s)).toBe(1);
    });

    it('"play again" from the end starts fresh', function () {
        let s = choose(mini, choose(mini, startGame(mini), 'b'), 'c');
        s = choose(mini, s, 'a');
        expect(s.visited).toEqual(['a']);
        expect(s.notes).toEqual(['note A']);
    });

    it('the engine and content never import Vue or touch the page', function () {
        ['src/engine/play.js', 'src/content/story.js'].forEach(function (file) {
            const code = readFileSync(file, 'utf8');
            expect(code, file).not.toMatch(/from ['"]vue['"]|document\.|window\./);
        });
    });
});
