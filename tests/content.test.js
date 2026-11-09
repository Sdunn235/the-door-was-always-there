// Checks the story itself: no broken links, nothing unreachable, every citation
// points to a real source, and the argument comes in the order the assignment requires.
import { describe, it, expect } from 'vitest';
import { story } from '../src/content/story.js';

const ids = Object.keys(story.scenes);

function citesIn(scene) {
    let cites = (scene.cites || []).slice();
    (scene.cards || []).forEach(function (card) {
        cites = cites.concat(card.cites || []);
    });
    return cites;
}

// Breadth-first walk from the start scene; returns the steps to each scene.
function distances() {
    const dist = {};
    dist[story.start] = 0;
    const queue = [story.start];
    while (queue.length) {
        const id = queue.shift();
        story.scenes[id].choices.forEach(function (c) {
            if (dist[c.to] === undefined) {
                dist[c.to] = dist[id] + 1;
                queue.push(c.to);
            }
        });
    }
    return dist;
}

describe('story structure', function () {
    it('starts at a real scene', function () {
        expect(story.scenes[story.start]).toBeDefined();
    });

    it('every choice leads to a real scene', function () {
        ids.forEach(function (id) {
            story.scenes[id].choices.forEach(function (c) {
                expect(story.scenes[c.to], id + ' -> ' + c.to).toBeDefined();
            });
        });
    });

    it('every scene can be reached from the start', function () {
        const dist = distances();
        ids.forEach(function (id) {
            expect(dist[id], id + ' is unreachable').toBeDefined();
        });
    });

    it('every scene has a title, a writing brief, and at least one choice', function () {
        ids.forEach(function (id) {
            const s = story.scenes[id];
            expect(s.title, id).toBeTruthy();
            expect(s.brief, id).toBeTruthy();
            expect(s.choices.length, id).toBeGreaterThan(0);
        });
    });

    it('follows the indirect order: problem -> solution -> objection -> refutation -> close', function () {
        const d = distances();
        expect(d.board).toBeLessThan(d.proposal);
        expect(d.proposal).toBeLessThan(d.objection);
        expect(d.objection).toBeLessThan(d.refutation);
        expect(d.refutation).toBeLessThan(d.close);
    });
});

describe('citations', function () {
    it('every cited id is a real source', function () {
        ids.forEach(function (id) {
            citesIn(story.scenes[id]).forEach(function (src) {
                expect(story.sources[src], id + ' cites ' + src).toBeDefined();
            });
        });
    });

    it('every source is cited somewhere in the story (APA: no uncited references)', function () {
        const used = new Set();
        ids.forEach(function (id) {
            citesIn(story.scenes[id]).forEach(function (src) {
                used.add(src);
            });
        });
        Object.keys(story.sources).forEach(function (src) {
            expect(used.has(src), src + ' is never cited').toBe(true);
        });
    });

    it('in-text year matches the reference year', function () {
        Object.keys(story.sources).forEach(function (id) {
            const s = story.sources[id];
            const inYear = s.inText.match(/(\d{4})$/)[1];
            expect(s.apa, id).toContain('(' + inYear);
        });
    });

    it('every source has a link (DOI or URL)', function () {
        Object.keys(story.sources).forEach(function (id) {
            expect(story.sources[id].url, id).toMatch(/^https:\/\//);
        });
    });
});
